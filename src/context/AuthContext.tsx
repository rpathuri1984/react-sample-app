import React from "react";
import { useLocalStorage } from "react-use";
import useAuthContext from "./useAuthContext";

export interface AuthContextInterface {
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  setLoginSuccess: (authTokens: any) => void;
  logout: () => Promise<void>;
  isValidToken: (token: string | null) => Promise<boolean>;
}

export const AuthContext = React.createContext<AuthContextInterface | null>(
  {} as AuthContextInterface
);

AuthContext.displayName = "AuthContext";

export const AuthContextConsumer = AuthContext.Consumer;

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [userToken] = useLocalStorage<any>("authTokens", null);
  const { expiresAt, isValidToken, logout, setLoginSuccess } = useAuthContext();

  const checkTokenValididty = React.useCallback(async () => {
    return await isValidToken(userToken?.access || "");
  }, [userToken, isValidToken]);

  checkTokenValididty().then((value) => {
    // console.log(value);
  });

  // presence of `value` indicates a controlled context
  const context = React.useMemo(
    () => ({
      token: userToken || "",
      expiresAt,
      checkingSession: false,
      isAuthenticated: userToken ? true : false,
      idToken: null,
      setLoginSuccess: setLoginSuccess,
      isValidToken: isValidToken,
      logout: logout,
    }),
    [userToken, expiresAt, isValidToken, logout, setLoginSuccess]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
