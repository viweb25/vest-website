"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn({
            message: err.message,
            code: err.code,
            path: req.path,
        });
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
        });
    }
    logger_1.logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
    });
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
    });
};
exports.errorHandler = errorHandler;
