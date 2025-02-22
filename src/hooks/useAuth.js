import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    ...context,
    user: context.auth.user,
    isLoggedIn: context.auth.isLoggedIn,
    accessToken: context.auth.accessToken,
    loading: context.loading,
  };
};

export default useAuth;
