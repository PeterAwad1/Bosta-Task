import React, { createContext, useContext, useState } from 'react';

import LogOutMessage from '@/components/layout/header/LogOutDialog';

import { LoginCredentials, LoginResponse } from '@/types';

import {
  getUser,
  removeAuthCookies,
  setToken,
  setUser as setUserCookie,
} from '@/utils/cookies';

import { loginApi } from '@/services/api-auth';

type AuthContextType = {
  user: { username: string; token: string } | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoggingIn: boolean;
  logout: () => void;
  confirmLogout: () => void;
  isAuthenticated: boolean;
  showLogoutDialog: boolean;
  setShowLogoutDialog: (show: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load user from cookies on initialization using lazy initialization
  const [user, setUser] = useState<{ username: string; token: string } | null>(
    () => getUser() || null,
  );
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    const response: LoginResponse = await loginApi(credentials);
    
    // For FakeStoreAPI, we need to get the username from credentials
    // The API doesn't return user info, just a token
    const userData = {
      username: credentials.username,
      token: response.token,
    };
    
    setUser(userData); // Update state
    setUserCookie(userData); // Save user to cookie
    setToken(response.token); // Save token to cookie
  };

  const logout = () => {
    // Show confirmation dialog instead of logging out immediately
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setUser(null);
    removeAuthCookies(); // Remove user and token from cookies
    setShowLogoutDialog(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoggingIn: false,
        logout,
        confirmLogout,
        isAuthenticated: !!user,
        showLogoutDialog,
        setShowLogoutDialog,
      }}
    >
      {children}
      <LogOutMessage
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onLogout={confirmLogout}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
