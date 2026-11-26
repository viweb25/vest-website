'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

export function LoginModal({ 
  children, 
  open, 
  onOpenChange, 
  onSuccess 
}: { 
  children?: React.ReactNode, 
  open?: boolean, 
  onOpenChange?: (open: boolean) => void, 
  onSuccess?: () => void 
}) {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalIsOpen;
  const setIsOpen = onOpenChange !== undefined ? onOpenChange : setInternalIsOpen;

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, confirmPassword });
      }
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        'An error occurred during authentication';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-backend.vestinnovations.com';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <DialogTrigger asChild>
          <div onClick={() => setIsOpen(true)} className="inline-block">
            {children}
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[430px] !rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl !overflow-visible">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-2xl font-black text-[#0B2340] dark:text-white tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-zinc-400">
            {mode === 'login'
              ? 'Enter your email and password to access your account.'
              : 'Enter your details below to create your account.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 pt-3 pb-1">
          {error && (
            <div className={`p-3 rounded-lg text-xs font-semibold ${error.toLowerCase().includes('successful') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              {error}
            </div>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">Email Address</Label>
            <Input
              id="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-lg border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-[#0B2340] dark:text-white focus-visible:ring-2 focus-visible:ring-[#0B2340]/20 focus-visible:border-[#0B2340]"
            />
          </div>
          
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">Password</Label>
              {mode === 'login' && (
                <Link href="#" className="text-xs font-semibold text-[#E7651A] hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 pr-10 rounded-lg border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-[#0B2340] dark:text-white focus-visible:ring-2 focus-visible:ring-[#0B2340]/20 focus-visible:border-[#0B2340]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="grid gap-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 pr-10 rounded-lg border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-[#0B2340] dark:text-white focus-visible:ring-2 focus-visible:ring-[#0B2340]/20 focus-visible:border-[#0B2340]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center rounded-lg bg-[#0B2340] hover:bg-[#143860] px-4 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-md hover:shadow transition-all disabled:opacity-70 active:scale-[0.99]"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-2 text-slate-400 dark:text-zinc-500 font-semibold tracking-wider text-[11px]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#0B2340] dark:text-zinc-200 transition-all shadow-sm hover:shadow active:scale-[0.99]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>
        </form>

        <div className="mt-3 text-center text-sm text-slate-500 dark:text-zinc-400">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" onClick={() => setMode('register')} className="font-bold text-[#E7651A] hover:underline">
                Create Account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')} className="font-bold text-[#E7651A] hover:underline">
                Login
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
