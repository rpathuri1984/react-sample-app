import React from "react";
import { AuthContext, AuthContextInterface } from "./AuthContext";
import useAuthContext from "./useAuthContext";

export interface AuthContextProviderProps {}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const authContext = useAuthContext();
  let [loading, setLoading] = React.useState(true);

  let contextData: AuthContextInterface = {
    login: (userName: string, pasword: string, returnPath?: string) =>
      authContext.loginUser(userName, pasword, returnPath),
    logout: () => authContext.logoutUser(),
    checkingSession: false,
    expiresAt: null,
    token: null,
    idToken: null,
    isAuthenticated: authContext.user != null,
    handleAuthentication: () => null,
  };

  React.useEffect(() => {
    setLoading(false);
  }, [loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : { children }}
    </AuthContext.Provider>
  );
};
