import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoutes = ({ role, children }) => {
  const { auth } = useAuth();

  if (!auth || (role && auth.role !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;