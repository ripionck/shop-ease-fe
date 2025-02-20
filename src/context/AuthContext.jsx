import { createContext } from 'react';

const AuthContext = createContext({
  auth: {
    user: null,
    accessToken: null,
    isLoggedIn: false,
  },
  login: () => {},
  logout: () => {},
});

export default AuthContext;
