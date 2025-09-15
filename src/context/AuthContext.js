// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const updateUserFromToken = useCallback((currentToken) => {
    if (currentToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
      const decoded = jwtDecode(currentToken);
      setUser({ id: decoded.id, isAdmin: decoded.isAdmin });
      localStorage.setItem('token', currentToken);
    } else {
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // This effect runs once on initial app load
    updateUserFromToken(token);
  }, [token, updateUserFromToken]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken } = response.data;
    setToken(newToken);
    updateUserFromToken(newToken);
  };

  const register = async (fullName, email, password) => {
    const response = await api.post('/auth/register', { fullName, email, password });
    const { token: newToken } = response.data;
    setToken(newToken);
    updateUserFromToken(newToken);
  };

  const logout = () => {
    setToken(null);
    updateUserFromToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;