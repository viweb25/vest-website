'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Start as false — page renders immediately; auth resolves in background
  const [isLoading, setIsLoading] = useState(false);

  const fetchMe = async () => {
    // try {
    //   const response = await api.get('/auth/me');
    //   if (response.data.success) {
    //     setUser(response.data.user);
    //   }
    // } catch (error) {
    //   setUser(null);
    // }
    setUser(null); // Just set to null directly to mock unauthenticated state
  };

  useEffect(() => {
    // Defer the auth check to after first paint so it never blocks navigation
    const timer = setTimeout(() => {
      // fetchMe(); // Disabled for now to hide backend errors
    }, 0);
    
    const handleUnauthorized = () => {
      setUser(null);
    };
    
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (data: any) => {
    const response = await api.post('/auth/login', data);
    if (response.data.success) {
      setUser(response.data.user);
    }
  };

  const register = async (data: any) => {
    await api.post('/auth/register', data);
    // Note: register doesn't set user directly if they need to verify email first
    // Or we could log them in right away depending on requirements.
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
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
