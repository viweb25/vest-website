import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { requireAuth } from '../middleware/auth.middleware';
import { loginRateLimiter } from '../middleware/rate-limit.middleware';

import { oauthController } from '../controllers/oauth.controller';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', loginRateLimiter, validate(loginSchema), authController.login);
router.post('/logout', requireAuth, authController.logout);
router.post('/refresh', authController.refresh);
router.get('/me', requireAuth, authController.getMe);

// OAuth Routes
router.get('/google', oauthController.googleLogin.bind(oauthController));
router.get('/google/callback', oauthController.googleCallback.bind(oauthController));
router.get('/github', oauthController.githubLogin.bind(oauthController));
router.get('/github/callback', oauthController.githubCallback.bind(oauthController));

// Stub routes for future implementation
// router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
// router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
// router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

export default router;
