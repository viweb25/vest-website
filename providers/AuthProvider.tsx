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
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMe();
    
    const handleUnauthorized = () => {
      setUser(null);
      localStorage.removeItem('mock_user');
    };
    
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (data: any) => {
    // TODO: Connect to backend API
    const mockUser = {
      id: 'mock-id-123',
      name: '',
      email: data.email,
      emailVerified: true,
      role: 'USER',
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (data: any) => {
    // TODO: Connect to backend API
    const mockUser = {
      id: 'mock-id-123',
      name: '',
      email: data.email,
      emailVerified: true,
      role: 'USER',
    };
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = async () => {
    // TODO: Connect to backend API
    localStorage.removeItem('mock_user');
    setUser(null);
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
