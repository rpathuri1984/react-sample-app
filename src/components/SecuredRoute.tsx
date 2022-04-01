import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "./../context/AuthContext";

const SecuredRoute = () => {
  const context = React.useContext(AuthContext);
  console.log(context, context?.isAuthenticated);
  return context?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecuredRoute;
