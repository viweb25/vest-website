"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../lib/prisma");
const errors_1 = require("../utils/errors");
const email_service_1 = require("./email.service");
class AuthService {
    generateTokens(userId) {
        const accessToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_ACCESS_SECRET || 'supersecret_access', { expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') });
        const refreshToken = crypto_1.default.randomBytes(40).toString('hex');
        const tokenHash = crypto_1.default.createHash('sha256').update(refreshToken).digest('hex');
        return { accessToken, refreshToken, tokenHash };
    }
    async register(data, ipAddress, userAgent) {
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            throw new errors_1.ConflictError('Email already in use');
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(data.password, salt);
        const user = await prisma_1.prisma.user.create({
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
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        await prisma_1.prisma.emailVerificationToken.create({
            data: {
                userId: user.id,
                token: verificationToken,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            },
        });
        await email_service_1.emailService.sendVerificationEmail(user.email, verificationToken);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
        };
    }
    async login(data, ipAddress, userAgent) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
        if (!user) {
            await prisma_1.prisma.loginAttempt.create({
                data: { email: data.email, ipAddress, success: false },
            });
            throw new errors_1.AuthenticationError('Invalid credentials');
        }
        const isMatch = user.passwordHash ? await bcryptjs_1.default.compare(data.password, user.passwordHash) : false;
        await prisma_1.prisma.loginAttempt.create({
            data: { userId: user.id, email: data.email, ipAddress, success: isMatch },
        });
        if (!isMatch) {
            throw new errors_1.AuthenticationError('Invalid credentials');
        }
        if (user.status !== 'ACTIVE') {
            throw new errors_1.AuthenticationError('User account is not active');
        }
        const { accessToken, refreshToken, tokenHash } = this.generateTokens(user.id);
        // Parse expires in from env or default to 7 days
        const daysMatch = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d').match(/(\d+)d/);
        const days = daysMatch ? parseInt(daysMatch[1]) : 7;
        const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        await prisma_1.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
                ipAddress,
                userAgent,
            },
        });
        await prisma_1.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });
        await prisma_1.prisma.auditLog.create({
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
    async logout(userId, refreshToken) {
        if (refreshToken) {
            const tokenHash = crypto_1.default.createHash('sha256').update(refreshToken).digest('hex');
            await prisma_1.prisma.refreshToken.updateMany({
                where: { userId, tokenHash },
                data: { revokedAt: new Date() },
            });
        }
        await prisma_1.prisma.auditLog.create({
            data: { userId, action: 'LOGOUT' }
        });
    }
    async refreshSession(oldRefreshToken, ipAddress, userAgent) {
        const tokenHash = crypto_1.default.createHash('sha256').update(oldRefreshToken).digest('hex');
        const rt = await prisma_1.prisma.refreshToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!rt) {
            throw new errors_1.AuthenticationError('Invalid refresh token');
        }
        if (rt.revokedAt) {
            // Token reuse detected - revoke all tokens for this user
            await prisma_1.prisma.refreshToken.updateMany({
                where: { userId: rt.userId, revokedAt: null },
                data: { revokedAt: new Date() },
            });
            await prisma_1.prisma.auditLog.create({
                data: { userId: rt.userId, action: 'TOKEN_REUSE_DETECTED', ipAddress }
            });
            throw new errors_1.AuthenticationError('Session terminated due to security violation');
        }
        if (rt.expiresAt < new Date()) {
            throw new errors_1.AuthenticationError('Refresh token expired');
        }
        if (rt.user.status !== 'ACTIVE') {
            throw new errors_1.AuthenticationError('User account is not active');
        }
        // Revoke old token
        await prisma_1.prisma.refreshToken.update({
            where: { id: rt.id },
            data: { revokedAt: new Date() },
        });
        const { accessToken, refreshToken, tokenHash: newTokenHash } = this.generateTokens(rt.userId);
        const daysMatch = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d').match(/(\d+)d/);
        const days = daysMatch ? parseInt(daysMatch[1]) : 7;
        const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        await prisma_1.prisma.refreshToken.create({
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
    async getMe(userId) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, emailVerified: true, role: true }
        });
        if (!user)
            throw new errors_1.NotFoundError('User not found');
        return user;
    }
    async handleOAuthLogin(provider, providerId, email, name, ipAddress, userAgent) {
        let user = await prisma_1.prisma.user.findFirst({
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
                throw new errors_1.AuthenticationError('User account is not active');
            }
            const updateData = { lastLoginAt: new Date() };
            if (provider === 'google' && !user.googleId)
                updateData.googleId = providerId;
            if (provider === 'github' && !user.githubId)
                updateData.githubId = providerId;
            if (!user.emailVerified)
                updateData.emailVerified = true;
            user = await prisma_1.prisma.user.update({
                where: { id: user.id },
                data: updateData
            });
        }
        else {
            user = await prisma_1.prisma.user.create({
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
        await prisma_1.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
                ipAddress,
                userAgent,
            },
        });
        await prisma_1.prisma.auditLog.create({
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
exports.AuthService = AuthService;
exports.authService = new AuthService();
