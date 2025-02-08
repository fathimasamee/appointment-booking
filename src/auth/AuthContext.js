import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  // Verify the user's token with the backend
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/verify');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null); // Set user to null if token verification fails
    } finally {
      setLoading(false); // Finished checking auth status
    }
  };

  // Login function that will store the token and user data
  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email,
      password
    });
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token); // Save token in localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData); // Set user data
  };

  // Logout function to clear the token and user data
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
