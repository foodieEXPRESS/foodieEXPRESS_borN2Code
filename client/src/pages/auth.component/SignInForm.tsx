import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { login, clearError } from '../../store/authSlice';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import './auth.css';


const SignInForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (error) {
      dispatch(clearError());
    }
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch Redux login thunk; navigation happens on success via state
    dispatch(login({ email: form.email, password: form.password }))
      .unwrap()
      .then(() => {
        // optional rememberMe handling could persist token differently if needed
        navigate(`/landing-page`);
      })
      .catch(() => {
        // error is already set in the store via rejected case
      });
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log('Google sign in clicked');
    // For demo purposes, navigate to dashboard
    navigate('/restaurant-profile');
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign in
    console.log('Facebook sign in clicked');
    // For demo purposes, navigate to dashboard
    navigate('/restaurant-profile');
  };

  return (
    <div className="MACHR-container">
      <div className="MACHRbrand">
        <span className="MACHRbrand-badge" aria-hidden>+</span>
        <span className="MACHRbrand-text">FoodieExpress</span>
      </div>
      <h2 className="MACHRsubtitle">Welcome Back!</h2>
      <p className="MACHRdescription">Sign in to your account to continue ordering</p>

      <div className="MACHRtab-container">
        <button className="active">
          Sign In
        </button>
        <button
          onClick={onSwitch}
          className=""
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="MACHRform">
        {error && <div className="MACHRerror">{error}</div>}
        <div className="MACHRform-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="MACHRform-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="MACHRform-options">
          <label className="MACHRcheckbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
          <a href="#" className="MACHRforgot-link">Forgot password?</a>
        </div>

        <button type="submit" className="MACHRbtn MACHR-btn primary" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="MACHR-social-section">
        <div className="MACHR-divider">or continue with</div>
        <div className="MACHR-social-buttons-container">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="MACHR-social-button"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleFacebookSignIn}
            className="MACHR-social-button"
          >
            <FaFacebookF size={22} color="#222"  />
            Continue with Facebook
          </button>
        </div>
      </div>

      <p className="MACHR-switch-text">
        Don't have an account? <button onClick={onSwitch} className="MACHR-switch-link">Sign up here</button>
      </p>
    </div>
  );
};

export default SignInForm;
