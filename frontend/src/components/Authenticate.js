import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Authenticate = () => {
  const { auth } = useAuth();
  console.log(auth);
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default Authenticate;
