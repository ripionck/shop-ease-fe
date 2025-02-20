import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    isLoggedIn: false,
  });

  const getAccessToken = () => {
    return (
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')
    );
  };

  const fetchUserProfile = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/profile/',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      setAuth((prev) => ({
        ...prev,
        user: response.data,
        accessToken: accessToken,
        isLoggedIn: true,
      }));
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    }
  };

  const login = (tokens, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('access_token', tokens.access);
    storage.setItem('refresh_token', tokens.refresh);

    setAuth((prev) => ({
      ...prev,
      accessToken: tokens.access,
      isLoggedIn: true,
    }));

    fetchUserProfile();
  };

  const logout = () => {
    ['access_token', 'refresh_token'].forEach((token) => {
      localStorage.removeItem(token);
      sessionStorage.removeItem(token);
    });
    setAuth({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    });
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
