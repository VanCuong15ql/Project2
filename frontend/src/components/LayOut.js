import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './common/NavBar';
import useAuth from '../hooks/useAuth';

const LayOut = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const hideNavBar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavBar &&!auth?.accessToken  && <NavBar />}
      <Outlet />
    </>
  );
};

export default LayOut;