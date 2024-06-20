import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token found');
      
      const response = await axios.post('http://localhost:5000/api/auth/refresh', { token: refreshToken });
      
      const newAccessToken = response.data.accessToken;
      setAuth(prev => {
        console.log('Token refreshed successfully');
        return { ...prev, accessToken: newAccessToken };
      });
      
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;