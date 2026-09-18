"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../utils/errors");
const prisma_1 = require("../lib/prisma");
const requireAuth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies?.access_token) {
            token = req.cookies.access_token;
        }
        if (!token) {
            return next(new errors_1.AuthenticationError('Not authorized, no token'));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET || 'supersecret_access');
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true, status: true },
        });
        if (!user) {
            return next(new errors_1.AuthenticationError('User no longer exists'));
        }
        if (user.status !== 'ACTIVE') {
            return next(new errors_1.AuthenticationError('User account is not active'));
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        req.token = token;
        next();
    }
    catch (error) {
        next(new errors_1.AuthenticationError('Not authorized, token failed'));
    }
};
exports.requireAuth = requireAuth;
const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new errors_1.AuthorizationError('Not authorized to access this route'));
        }
        next();
    };
};
exports.requireRole = requireRole;
