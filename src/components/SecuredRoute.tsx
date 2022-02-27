import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "./../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const SecuredRoute = () => {
  const context = React.useContext(AuthContext);
  // context?.restoreContextFromLocalStorage();
  const authTokens = useLocalStorage("authTokens", "");

  console.log(context, authTokens);

  return authTokens ? <Outlet /> : <Navigate to="/login" />;
};

export default SecuredRoute;
