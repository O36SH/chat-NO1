import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateUserId } from '../utils/idGenerator';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
  }, [user]);

  const login = (credentials) => {
    // In a real app, this would make an API call
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const parsedCredentials = JSON.parse(savedCredentials);
      if (credentials.email === parsedCredentials.email && 
          credentials.password === parsedCredentials.password) {
        const user = {
          id: parsedCredentials.id,
          email: credentials.email,
          level: 1,
          points: 0,
          avatar: null
        };
        setUser(user);
        return true;
      }
    }
    return false;
  };

  const register = (userData) => {
    // In a real app, this would make an API call
    const newUser = {
      id: generateUserId(),
      email: userData.email,
      password: userData.password // In a real app, this should be hashed
    };
    
    // Store credentials for login
    localStorage.setItem('credentials', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}