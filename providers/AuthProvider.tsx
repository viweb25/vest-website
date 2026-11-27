'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
}

export interface UserProfile {
  name?: string;
  companyName?: string;
  phone?: string;
  phoneCountryCode?: string;
  designation?: string;
  city?: string;
  country?: string;
  contactMethod?: string;
  bestTimeToContact?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; confirmPassword?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data?.success && res.data.user) {
        const u = res.data.user;
        setUser({
          id: u.id,
          name: u.name || u.profile?.name || (u.email ? u.email.split('@')[0] : 'User'),
          email: u.email,
          emailVerified: !!u.emailVerified,
          role: u.role || 'USER',
        });
        if (u.profile) {
          setProfile(u.profile);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if OAuth redirect returned with ?auth=success
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('auth') === 'success') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }

    fetchMe();

    const handleUnauthorized = () => {
      setUser(null);
      setProfile(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      if (res.data?.success && res.data.user) {
        const u = res.data.user;
        setUser({
          id: u.id,
          name: u.name || u.profile?.name || (u.email ? u.email.split('@')[0] : 'User'),
          email: u.email,
          emailVerified: !!u.emailVerified,
          role: u.role || 'USER',
        });
        if (u.profile) {
          setProfile(u.profile);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { email: string; password: string; confirmPassword?: string }) => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/register', {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword || data.password,
      });

      if (res.data?.success) {
        // Automatically login with registered credentials
        await login({ email: data.email, password: data.password });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const res = await api.put('/profile/me', data);
      if (res.data?.success && res.data.data?.profile) {
        setProfile(res.data.data.profile);
        if (res.data.data.profile.name) {
          setUser((prev) => prev ? { ...prev, name: res.data.data.profile.name } : null);
        }
      } else {
        setProfile((prev) => ({ ...(prev || {}), ...data }));
      }
    } catch {
      setProfile((prev) => ({ ...(prev || {}), ...data }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
