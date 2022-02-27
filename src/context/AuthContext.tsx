import React from "react";

export interface AuthContextInterface {
  checkingSession: boolean;
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  login: (
    userName: string,
    pasword: string,
    returnPath?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  restoreContextFromLocalStorage: () => Promise<void>;
  isValidateToken: (token: string) => Promise<boolean>;
}

export const AuthContext = React.createContext<AuthContextInterface | null>(
  null
);

export const AuthContextProvider = AuthContext.Provider;

export const AuthContextConsumer = AuthContext.Consumer;
