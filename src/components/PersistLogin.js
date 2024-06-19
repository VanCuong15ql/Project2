import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loading from "../Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, trusted, logoutConfirm } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error('Error in verifyRefreshToken:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      if (!logoutConfirm) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [auth, refresh, logoutConfirm]);

  return (
    <>
      {!trusted ? (
        <Outlet />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;