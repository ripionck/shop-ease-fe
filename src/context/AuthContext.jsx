import { createContext } from 'react';

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
export default AuthContext;
