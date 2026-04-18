import { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('neofi_token'));

  const login = (authToken) => {
    localStorage.setItem('neofi_token', authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('neofi_token');
    setToken(null);
  };

  const value = useMemo(() => ({
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }), [token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
