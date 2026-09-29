"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rate_limit_middleware_1 = require("../middleware/rate-limit.middleware");
const oauth_controller_1 = require("../controllers/oauth.controller");
const router = (0, express_1.Router)();
router.post('/register', (0, validate_middleware_1.validate)(auth_validator_1.registerSchema), auth_controller_1.authController.register);
router.post('/login', rate_limit_middleware_1.loginRateLimiter, (0, validate_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.authController.login);
router.post('/logout', auth_middleware_1.requireAuth, auth_controller_1.authController.logout);
router.post('/refresh', auth_controller_1.authController.refresh);
router.get('/me', auth_middleware_1.requireAuth, auth_controller_1.authController.getMe);
// OAuth Routes
router.get('/google', oauth_controller_1.oauthController.googleLogin.bind(oauth_controller_1.oauthController));
router.get('/google/callback', oauth_controller_1.oauthController.googleCallback.bind(oauth_controller_1.oauthController));
router.get('/github', oauth_controller_1.oauthController.githubLogin.bind(oauth_controller_1.oauthController));
router.get('/github/callback', oauth_controller_1.oauthController.githubCallback.bind(oauth_controller_1.oauthController));
// Stub routes for future implementation
// router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
// router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
// router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
exports.default = router;
