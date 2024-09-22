import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../api/axios';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
        const response = await axiosInstance.get('/me');
        setUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { access_token, user } = response.data.data;
      console.log('response data', response.data);
      localStorage.setItem('token', access_token);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${access_token}`;
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password
      });
      const { access_token, user } = response.data.data;
      localStorage.setItem('token', access_token);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${access_token}`;
      setUser(user);
      return user;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
