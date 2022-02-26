import { Route, Navigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "./../context/AuthContext";

interface SecuredRouteProps {
  path: string;
}

const SecuredRoute: React.FC<SecuredRouteProps> = ({ children, ...rest }) => {
  let { token } = React.useContext(AuthContext);
  return <Route {...rest}>{token ? children : <Navigate to="/login" />}</Route>;
};

export default SecuredRoute;
