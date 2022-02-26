import React from "react";
import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { PostRequest } from "../services/ApiUtils";

const useAuthContext = () => {
  //const navigate = useNavigate();
  const toast = useToast();

  const getAuthTokens = () => {
    const token = localStorage.getItem("authTokens");
    if (typeof token === "string") {
      return JSON.parse(token);
    } else {
      return null;
    }
  };

  const getDecodedToken = () => {
    const token = getAuthTokens();
    if (token) {
      return jwt_decode(token);
    }
  };

  let [authTokens, setAuthTokens] = React.useState(() => getAuthTokens());
  let [user, setUser] = React.useState(() => getDecodedToken());

  const loginUser = async (
    userName: string,
    pasword: string,
    returnPath?: string
  ) => {
    const res = await PostRequest({
      url: "http://127.0.0.1:8000/api/token/",
      body: { userName, pasword },
    });
    if (res.status === 200) {
      setAuthTokens(res.data);
      setUser(jwt_decode(res.data.access));
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      //navigate(returnPath || "/");
    } else {
      toast({
        title: `Something went wrong!`,
        status: "error",
        isClosable: true,
      });
    }
  };
  const logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    //navigate("/login");
  };

  return { loginUser, logoutUser, authTokens, user };
};

export default useAuthContext;
