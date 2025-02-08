import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './styles.css'; // Import CSS file


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      await login(formData.email, formData.password);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <div className="login-content">
          {error && <div className="login-alert">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className="login-links">
            <a href="/forgot-password">Forgot your password?</a>
            <p>Don't have an account? <a href="/Signup">Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
