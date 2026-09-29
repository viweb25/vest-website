import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/errors';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    next(new AppError(options.message, options.statusCode, 'RATE_LIMIT_ERROR'));
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    next(new AppError(options.message, options.statusCode, 'RATE_LIMIT_ERROR'));
  },
  standardHeaders: true,
  legacyHeaders: false,
});
