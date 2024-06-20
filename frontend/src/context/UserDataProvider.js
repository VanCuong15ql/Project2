import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { auth } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth?.accessToken) {
        try {
          const endpoint = auth.role === 'company' ? 'http://localhost:5000/api/company/profile' : 'http://localhost:5000/api/user/me';
          console.log('Fetching user data from:', endpoint);
          const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          setUserData(response.data);
          console.log('UserData fetched successfully:', response.data);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, [auth]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};