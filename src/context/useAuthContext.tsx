import React from "react";
import jwt_decode from "jwt-decode";
import { apiClient } from "../services/ApiUtils";
import { AuthContextInterface } from "./AuthContext";

interface JwtPayload {
  email: string;
  exp: number;
  // whatever else is in the JWT.
}

const useAuthContext = (): AuthContextInterface => {
  let [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  let [token, setToken] = React.useState<string>("");
  let [idToken, setIdToken] = React.useState<string | null>(null);
  let [expiresAt, setExpiresAt] = React.useState<number | null>(null);

  const logout = async () => {
    setIsAuthenticated(false);
    setToken("");
    setExpiresAt(null);
    setIdToken(null);
    localStorage.removeItem("authTokens");
  };

  const isValidToken = async (token: string | null) => {
    if (!token) return false;

    const res = await apiClient.post("validatetoken", {
      data: {
        token,
      },
    });

    if (res.status === 200) {
      setIsAuthenticated(true);
      return res.data;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const setLoginSuccess = ({ access, refresh }: any) => {
    setIsAuthenticated(true);
    if (access) {
      const jwt = jwt_decode<JwtPayload>(access);
      setExpiresAt(jwt.exp);
      setIdToken(jwt.email);
    }

    localStorage.setItem("authTokens", JSON.stringify({ access, refresh }));
  };

  return {
    token,
    expiresAt,
    idToken,
    isAuthenticated,
    setLoginSuccess,
    logout,
    isValidToken,
  };
};

export default useAuthContext;
