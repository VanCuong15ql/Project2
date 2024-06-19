import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : {};
  });
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [trusted, setTrusted] = useState(JSON.parse(localStorage.getItem("trusted") || false));

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('trusted', JSON.stringify(trusted));
  }, [trusted]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, trusted, setTrusted, logoutConfirm, setLogoutConfirm }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;