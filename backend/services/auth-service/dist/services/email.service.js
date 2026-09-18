"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
// Mock email service for development
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_EMAIL || 'ethereal.user@ethereal.email',
                pass: process.env.ETHEREAL_PASSWORD || 'ethereal_password',
            },
        });
    }
    async sendVerificationEmail(to, token) {
        const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        const mailOptions = {
            from: '"RepairSync" <noreply@repairsync.com>',
            to,
            subject: 'Verify your email address',
            html: `<p>Please verify your email by clicking the link below:</p><p><a href="${url}">${url}</a></p>`,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Verification email sent to ${to}. Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
        }
        catch (error) {
            logger_1.logger.error({ message: 'Failed to send verification email', error });
        }
    }
    async sendPasswordResetEmail(to, token) {
        const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        const mailOptions = {
            from: '"RepairSync" <noreply@repairsync.com>',
            to,
            subject: 'Reset your password',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${url}">${url}</a></p>`,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Password reset email sent to ${to}. Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
        }
        catch (error) {
            logger_1.logger.error({ message: 'Failed to send password reset email', error });
        }
    }
    async sendWelcomeEmail(to, name) {
        const mailOptions = {
            from: '"RepairSync" <noreply@repairsync.com>',
            to,
            subject: 'Welcome to RepairSync',
            html: `<p>Hi ${name},</p><p>Welcome to RepairSync! We're glad you're here.</p>`,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.logger.info(`Welcome email sent to ${to}. Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
        }
        catch (error) {
            logger_1.logger.error({ message: 'Failed to send welcome email', error });
        }
    }
}
exports.EmailService = EmailService;
exports.emailService = new EmailService();
