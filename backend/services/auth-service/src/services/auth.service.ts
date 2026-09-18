import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { AuthenticationError, ConflictError, NotFoundError } from '../utils/errors';
import { emailService } from './email.service';

export class AuthService {
  private generateTokens(userId: string) {
    const accessToken = jwt.sign(
      { id: userId },
      process.env.JWT_ACCESS_SECRET || 'supersecret_access',
      { expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') as any }
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    return { accessToken, refreshToken, tokenHash };
  }

  async register(data: any, ipAddress: string, userAgent: string) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new ConflictError('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        profile: {
          create: {
            phone: data.phone || null,
          },
        },
      },
    });

    const verificationToken = crypto.randomBytes(32).toString('hex');
    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    await emailService.sendVerificationEmail(user.email, verificationToken);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  async login(data: any, ipAddress: string, userAgent: string) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      await prisma.loginAttempt.create({
        data: { email: data.email, ipAddress, success: false },
      });
      throw new AuthenticationError('Invalid credentials');
    }

    const isMatch = user.passwordHash ? await bcrypt.compare(data.password, user.passwordHash) : false;

    await prisma.loginAttempt.create({
      data: { userId: user.id, email: data.email, ipAddress, success: isMatch },
    });

    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new AuthenticationError('User account is not active');
    }

    const { accessToken, refreshToken, tokenHash } = this.generateTokens(user.id);

    // Parse expires in from env or default to 7 days
    const daysMatch = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d').match(/(\d+)d/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 7;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'LOGIN', ipAddress }
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role
      },
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string, refreshToken: string | undefined) {
    if (refreshToken) {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await prisma.refreshToken.updateMany({
        where: { userId, tokenHash },
        data: { revokedAt: new Date() },
      });
    }

    await prisma.auditLog.create({
      data: { userId, action: 'LOGOUT' }
    });
  }

  async refreshSession(oldRefreshToken: string, ipAddress: string, userAgent: string) {
    const tokenHash = crypto.createHash('sha256').update(oldRefreshToken).digest('hex');

    const rt = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!rt) {
      throw new AuthenticationError('Invalid refresh token');
    }

    if (rt.revokedAt) {
      // Token reuse detected - revoke all tokens for this user
      await prisma.refreshToken.updateMany({
        where: { userId: rt.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      await prisma.auditLog.create({
        data: { userId: rt.userId, action: 'TOKEN_REUSE_DETECTED', ipAddress }
      });
      throw new AuthenticationError('Session terminated due to security violation');
    }

    if (rt.expiresAt < new Date()) {
      throw new AuthenticationError('Refresh token expired');
    }

    if (rt.user.status !== 'ACTIVE') {
      throw new AuthenticationError('User account is not active');
    }

    // Revoke old token
    await prisma.refreshToken.update({
      where: { id: rt.id },
      data: { revokedAt: new Date() },
    });

    const { accessToken, refreshToken, tokenHash: newTokenHash } = this.generateTokens(rt.userId);

    const daysMatch = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d').match(/(\d+)d/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 7;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: rt.userId,
        tokenHash: newTokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: rt.user.id,
        name: rt.user.name,
        email: rt.user.email,
        emailVerified: rt.user.emailVerified,
        role: rt.user.role
      }
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, emailVerified: true, role: true }
    });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async handleOAuthLogin(provider: 'google' | 'github', providerId: string, email: string, name: string, ipAddress: string, userAgent: string) {
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { googleId: provider === 'google' ? providerId : undefined },
          { githubId: provider === 'github' ? providerId : undefined },
          { email }
        ]
      }
    });

    if (user) {
      if (user.status !== 'ACTIVE') {
        throw new AuthenticationError('User account is not active');
      }

      const updateData: any = { lastLoginAt: new Date() };
      if (provider === 'google' && !user.googleId) updateData.googleId = providerId;
      if (provider === 'github' && !user.githubId) updateData.githubId = providerId;
      if (!user.emailVerified) updateData.emailVerified = true;

      user = await prisma.user.update({
        where: { id: user.id },
        data: updateData
      });
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name,
          emailVerified: true,
          googleId: provider === 'google' ? providerId : null,
          githubId: provider === 'github' ? providerId : null,
          lastLoginAt: new Date(),
          profile: {
            create: {}
          }
        }
      });
    }

    const { accessToken, refreshToken, tokenHash } = this.generateTokens(user.id);

    const daysMatch = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d').match(/(\d+)d/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 7;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: `OAUTH_LOGIN_${provider.toUpperCase()}`, ipAddress }
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role
      },
      accessToken,
      refreshToken,
    };
  }
}

export const authService = new AuthService();
