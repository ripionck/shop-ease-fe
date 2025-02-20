import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const checkAuthStatus = () => {
    const accessToken =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    const refreshToken =
      localStorage.getItem('refresh_token') ||
      sessionStorage.getItem('refresh_token');
    return !!accessToken && !!refreshToken;
  };

  const fetchUserProfile = async () => {
    try {
      const accessToken =
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token');

      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/profile/',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const login = (tokens, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
    } else {
      sessionStorage.setItem('access_token', tokens.access);
      sessionStorage.setItem('refresh_token', tokens.refresh);
    }
    setIsLoggedIn(true);
    fetchUserProfile();
  };

  const logout = () => {
    ['access_token', 'refresh_token'].forEach((token) => {
      localStorage.removeItem(token);
      sessionStorage.removeItem(token);
    });
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  useEffect(() => {
    const loggedIn = checkAuthStatus();
    setIsLoggedIn(loggedIn);
    if (loggedIn) fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
