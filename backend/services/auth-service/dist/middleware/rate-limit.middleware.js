"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRateLimiter = exports.loginRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const errors_1 = require("../utils/errors");
exports.loginRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    handler: (req, res, next, options) => {
        next(new errors_1.AppError(options.message, options.statusCode, 'RATE_LIMIT_ERROR'));
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.apiRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    handler: (req, res, next, options) => {
        next(new errors_1.AppError(options.message, options.statusCode, 'RATE_LIMIT_ERROR'));
    },
    standardHeaders: true,
    legacyHeaders: false,
});
