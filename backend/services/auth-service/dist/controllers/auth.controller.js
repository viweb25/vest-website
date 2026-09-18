"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            const user = await auth_service_1.authService.register(req.body, req.ip || req.socket.remoteAddress || '', req.headers['user-agent'] || '');
            res.status(201).json({
                success: true,
                message: 'Registration successful. Please verify your email.',
                user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { user, accessToken, refreshToken } = await auth_service_1.authService.login(req.body, req.ip || req.socket.remoteAddress || '', req.headers['user-agent'] || '');
            const domain = process.env.COOKIE_DOMAIN || undefined;
            const isProd = process.env.NODE_ENV === 'production';
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                domain,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            // Optionally store access token in cookie too, or return in body.
            // Next.js client component approach can work well with access token in memory or cookie.
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                domain,
                maxAge: 15 * 60 * 1000, // 15 mins
            });
            res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies?.refresh_token;
            if (req.user) {
                await auth_service_1.authService.logout(req.user.id, refreshToken);
            }
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
            res.json({
                success: true,
                message: 'Logged out successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const oldRefreshToken = req.cookies?.refresh_token;
            if (!oldRefreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'No refresh token provided',
                    code: 'NO_REFRESH_TOKEN'
                });
            }
            const { accessToken, refreshToken, user } = await auth_service_1.authService.refreshSession(oldRefreshToken, req.ip || req.socket.remoteAddress || '', req.headers['user-agent'] || '');
            const domain = process.env.COOKIE_DOMAIN || undefined;
            const isProd = process.env.NODE_ENV === 'production';
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                domain,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                domain,
                maxAge: 15 * 60 * 1000,
            });
            res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            res.clearCookie('refresh_token');
            res.clearCookie('access_token');
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            if (!req.user)
                throw new Error('User missing from request');
            const user = await auth_service_1.authService.getMe(req.user.id);
            res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
