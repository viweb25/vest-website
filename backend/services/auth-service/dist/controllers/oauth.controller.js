"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthController = exports.OAuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class OAuthController {
    // ================= GOOGLE OAUTH =================
    googleLogin(req, res) {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_CALLBACK_URL;
        if (!clientId || !redirectUri)
            return res.status(500).json({ error: 'Google OAuth not configured' });
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
        res.redirect(url);
    }
    async googleCallback(req, res, next) {
        try {
            const code = req.query.code;
            if (!code)
                return res.status(400).json({ error: 'No code provided' });
            // Exchange code for token
            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                    grant_type: 'authorization_code',
                }),
            });
            const tokenData = await tokenResponse.json();
            if (!tokenData.access_token)
                return res.status(400).json({ error: 'Failed to fetch access token', details: tokenData });
            // Fetch user profile
            const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const profile = await profileResponse.json();
            if (!profile.id || !profile.email)
                return res.status(400).json({ error: 'Failed to fetch profile' });
            // Handle Login
            const { user, accessToken, refreshToken } = await auth_service_1.authService.handleOAuthLogin('google', profile.id, profile.email, profile.name || 'Google User', req.ip || req.socket.remoteAddress || '', req.headers['user-agent'] || '');
            this.setCookiesAndRedirect(res, accessToken, refreshToken);
        }
        catch (error) {
            next(error);
        }
    }
    // ================= GITHUB OAUTH =================
    githubLogin(req, res) {
        const clientId = process.env.GITHUB_CLIENT_ID;
        const redirectUri = process.env.GITHUB_CALLBACK_URL;
        if (!clientId || !redirectUri)
            return res.status(500).json({ error: 'GitHub OAuth not configured' });
        const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
        res.redirect(url);
    }
    async githubCallback(req, res, next) {
        try {
            const code = req.query.code;
            if (!code)
                return res.status(400).json({ error: 'No code provided' });
            // Exchange code for token
            const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                    redirect_uri: process.env.GITHUB_CALLBACK_URL,
                }),
            });
            const tokenData = await tokenResponse.json();
            if (!tokenData.access_token)
                return res.status(400).json({ error: 'Failed to fetch access token', details: tokenData });
            // Fetch user profile
            const profileResponse = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                    Accept: 'application/json'
                },
            });
            const profile = await profileResponse.json();
            let email = profile.email;
            if (!email) {
                // fetch emails if not public
                const emailsResponse = await fetch('https://api.github.com/user/emails', {
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`,
                        Accept: 'application/json'
                    },
                });
                const emails = await emailsResponse.json();
                const primary = emails.find((e) => e.primary) || emails[0];
                email = primary?.email;
            }
            if (!profile.id || !email)
                return res.status(400).json({ error: 'Failed to fetch profile or email' });
            // Handle Login
            const { user, accessToken, refreshToken } = await auth_service_1.authService.handleOAuthLogin('github', profile.id.toString(), email, profile.name || profile.login || 'GitHub User', req.ip || req.socket.remoteAddress || '', req.headers['user-agent'] || '');
            this.setCookiesAndRedirect(res, accessToken, refreshToken);
        }
        catch (error) {
            next(error);
        }
    }
    // ================= HELPER =================
    setCookiesAndRedirect(res, accessToken, refreshToken) {
        const domain = process.env.COOKIE_DOMAIN || undefined;
        const isProd = process.env.NODE_ENV === 'production';
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            domain,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
            domain,
            maxAge: 15 * 60 * 1000, // 15 mins
        });
        res.redirect(`${frontendUrl}?auth=success`);
    }
}
exports.OAuthController = OAuthController;
exports.oauthController = new OAuthController();
