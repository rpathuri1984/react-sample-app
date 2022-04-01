import React from "react";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { apiClient } from "../services/ApiUtils";
import { AuthContextInterface } from "./AuthContext";

interface JwtPayload {
  email: string;
  exp: number;
  // whatever else is in the JWT.
}

const useAuthContext = (): AuthContextInterface => {
  const toast = useToast();

  let [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  let [checkingSession, seCheckingSession] = React.useState<boolean>(false);
  let [token, setToken] = React.useState<string>("");
  let [idToken, setIdToken] = React.useState<string | null>(null);
  let [expiresAt, setExpiresAt] = React.useState<number | null>(null);

  const login = async (
    userName: string,
    pasword: string,
    returnPath?: string
  ) => {
    try {
      seCheckingSession(true);
      const res = await apiClient.get("http://127.0.0.1:8000/api/token/", {
        data: { userName, pasword },
      });
      seCheckingSession(false);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setToken(res.data.access);
        if (token) {
          const jwt = jwt_decode<JwtPayload>(token);
          setExpiresAt(jwt.exp);
          setIdToken(jwt.email);
        }

        localStorage.setItem("authTokens", JSON.stringify(res.data));
      } else {
        setIsAuthenticated(false);
        toast({
          title: `Something went wrong!`,
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  return {
    token,
    expiresAt,
    checkingSession,
    idToken,
    isAuthenticated,
    login,
    logout,
    isValidToken,
  };
};

export default useAuthContext;
