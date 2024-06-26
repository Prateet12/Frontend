import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgot_password.css'; // Import the CSS file

const ForgotPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long');
    } else if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
    } else if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one digit');
    } else {
      setError('');
      try {
        const response = await fetch('/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          window.alert('Password has been reset successfully. You will be redirected to the login page.');
          navigate('/login-signup');
        } else {
          setError('Failed to reset password');
        }
      } catch (error) {
        console.error('Password Reset Error:', error);
        setError('An error occurred while resetting the password');
      }
    }
  };

  return (
    <div className="container_forgot">
      <h2 className="header_forgot">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="forgot_form">
        <div className="inputGroup">
          <label className="label">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
