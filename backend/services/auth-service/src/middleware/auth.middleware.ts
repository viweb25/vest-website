import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '../utils/errors';
import { prisma } from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  token?: string;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return next(new AuthenticationError('Not authorized, no token'));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'supersecret_access'
    ) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, status: true },
    });

    if (!user) {
      return next(new AuthenticationError('User no longer exists'));
    }

    if (user.status !== 'ACTIVE') {
      return next(new AuthenticationError('User account is not active'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    req.token = token;

    next();
  } catch (error) {
    next(new AuthenticationError('Not authorized, token failed'));
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AuthorizationError('Not authorized to access this route')
      );
    }
    next();
  };
};
