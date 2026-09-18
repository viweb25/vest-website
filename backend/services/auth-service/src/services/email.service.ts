import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

// Mock email service for development
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_EMAIL || 'ethereal.user@ethereal.email',
        pass: process.env.ETHEREAL_PASSWORD || 'ethereal_password',
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
      from: '"RepairSync" <noreply@repairsync.com>',
      to,
      subject: 'Verify your email address',
      html: `<p>Please verify your email by clicking the link below:</p><p><a href="${url}">${url}</a></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Verification email sent to ${to}. Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
      logger.error({ message: 'Failed to send verification email', error });
    }
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: '"RepairSync" <noreply@repairsync.com>',
      to,
      subject: 'Reset your password',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${url}">${url}</a></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to ${to}. Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
      logger.error({ message: 'Failed to send password reset email', error });
    }
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: '"RepairSync" <noreply@repairsync.com>',
      to,
      subject: 'Welcome to RepairSync',
      html: `<p>Hi ${name},</p><p>Welcome to RepairSync! We're glad you're here.</p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Welcome email sent to ${to}. Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } catch (error) {
      logger.error({ message: 'Failed to send welcome email', error });
    }
  }
}

export const emailService = new EmailService();
