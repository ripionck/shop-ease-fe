import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const AuthContext = createContext({
  loading: true,
  auth: {
    user: null,
    accessToken: null,
    isLoggedIn: false,
  },
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    isLoggedIn: false,
  });
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    return (
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')
    );
  };

  const fetchUserProfile = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        'https://shop-ease-3oxf.onrender.com/api/v1/profile/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setAuth({
        user: response.data.user,
        accessToken: accessToken,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (tokens, rememberMe) => {
    try {
      // Clear tokens from both storages to avoid conflicts
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');

      // Store tokens in the appropriate storage based on rememberMe
      if (rememberMe) {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
      } else {
        sessionStorage.setItem('access_token', tokens.access);
        sessionStorage.setItem('refresh_token', tokens.refresh);
      }

      // Update auth state
      setAuth({
        user: null, // Temporarily set to null until profile is fetched
        accessToken: tokens.access,
        isLoggedIn: true,
      });

      // Fetch user profile
      await fetchUserProfile();
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear tokens from both storages
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

    // Reset auth state
    setAuth({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    });
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
