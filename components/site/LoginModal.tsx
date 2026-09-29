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

import { Github, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAuth } from '@/providers/AuthProvider';

export function LoginModal({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email, password });
        setIsOpen(false);
      } else {
        if (!phone || phone.length < 10) {
          setError('Please enter a valid phone number');
          setLoading(false);
          return;
        }
        await register({ name, email, password, phone });
        setMode('login');
        setError('Registration successful! Please sign in.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)} className="inline-block">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'login' ? 'Sign in' : 'Create an account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Enter your email and password to access your RepairSync dashboard.'
              : 'Enter your details below to create your account.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {error && (
            <div className={`text-sm ${error.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-[var(--ink)]">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-[var(--ink)]">Phone Number</Label>
              <PhoneInput
                country={'us'}
                enableSearch={true}
                value={phone}
                onChange={val => setPhone('+' + val)}
                inputClass="!flex !h-10 !w-full !rounded-md !border !border-input !bg-background !pl-[52px] !pr-3 !py-2 !text-sm !ring-offset-background placeholder:!text-muted-foreground focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-ring focus-visible:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
                containerClass="flex w-full"
                buttonClass="!border-input !bg-background !rounded-l-md"
                searchClass="!bg-background !text-foreground"
                dropdownClass="!bg-background !text-foreground !border-input"
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-[var(--ink)]">Email</Label>
            <Input
              id="email"
              placeholder="Mail@repairsync.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[var(--ink)]">Password</Label>
              {mode === 'login' && (
                <Link href="#" className="text-xs font-medium text-[var(--accent)] hover:underline">
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
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl flex items-center justify-center bg-white  shadow-lg shadow-[#0e7c86]/10 px-4 py-3 text-sm font-medium text-black dark:text-white shadow-xl shadow-[#0e7c86]/25 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--ink)]/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-[var(--ink-muted)]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => window.location.href = 'http://localhost:4000/api/auth/google'} type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[var(--ink)]/20 bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button onClick={() => window.location.href = 'http://localhost:4000/api/auth/github'} type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[var(--ink)]/20 bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)]/5">
              <Github className="h-4 w-4" />
              GitHub
            </button>
          </div>
        </form>

        <div className="mt-2 text-center text-sm text-[var(--ink-soft)]">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button onClick={() => setMode('register')} className="font-semibold text-[var(--accent)] hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="font-semibold text-[var(--accent)] hover:underline">
                Sign in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
