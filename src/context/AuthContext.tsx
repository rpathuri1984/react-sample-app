import React from "react";

export interface AuthContextInterface {
  checkingSession: boolean;
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  handleAuthentication: () => void;
  login: (
    userName: string,
    pasword: string,
    returnPath?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  expiresAt: null,
  token: null,
  idToken: null,
  isAuthenticated: false,
  handleAuthentication: () => null,
  login: async (e) => await new Promise((resolve) => resolve()),
  logout: async () => await new Promise((resolve) => resolve()),
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);
