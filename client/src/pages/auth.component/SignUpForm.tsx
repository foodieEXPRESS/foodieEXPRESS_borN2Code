import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { register as registerThunk, clearError } from '../../store/authSlice';
import { FaBiking, FaUserAlt, FaStore } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import './auth.css';


type Role = 'delivery' | 'customer' | 'restaurant';

const SignUpForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [role, setRole] = useState<Role>('customer');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const roleOptions = [
    {
      value: 'delivery',
      label: 'Delivery Rider',
      icon: <FaBiking size={22} color="#4318D1" className="MACHR-role-option-icon" />,
      desc: 'Deliver orders and earn money',
    },
    {
      value: 'customer',
      label: 'Customer',
      icon: <FaUserAlt size={22} color="#4318D1" className="MACHR-role-option-icon" />,
      desc: 'Order food from restaurants',
    },
    {
      value: 'restaurant',
      label: 'Restaurant',
      icon: <FaStore size={22} color="#4318D1" className="MACHR-role-option-icon" />,
      desc: 'Manage your restaurant and orders',
    },
  ];
  const selectedRole = roleOptions.find(r => r.value === role);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (error) {
      dispatch(clearError());
    }
    if (localError) {
      setLocalError(null);
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    // Map UI role to backend enum and field names expected by RegisterData
    const mappedRole = role === 'customer' ? 'CUSTOMER' : role === 'restaurant' ? 'RESTAURANT' : 'DRIVER';
    const payload = {
      fullName: form.name,
      email: form.email,
      password: form.password,
      role: mappedRole as 'CUSTOMER' | 'RESTAURANT' | 'DRIVER',
      phoneNumber: form.phone || undefined,
    };
    dispatch(registerThunk(payload))
      .unwrap()
      .then(() => {
        // After successful signup, switch to Sign In form
        onSwitch();
      })
      .catch(() => {
        // error is handled in store
      });
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log('Google sign up clicked');
    // For demo purposes, navigate to dashboard
    navigate('/restaurant-profile');
  };

  return (
    <div className="MACHR-container">
      <div className="MACH-brand">
        <span className="MACHR-brand-badge" aria-hidden>+</span>
        <span className="MACHR-brand-text">FoodieExpress</span>
      </div>
      <h2 className="MACHR-subtitle">Join FoodieExpress!</h2>
      <p className="MACHR-description">Create your account and start your journey</p>

      <div className="auth-tab-container">
        <button onClick={onSwitch} className="MACHR-auth-tab-inactive">Sign In</button>
        <button className="MACHR-auth-tab-active">Sign Up</button>
      </div>

      <div className="MACHR-role-section-custom">
        <h3 className="MACHR-section-title">Select Your Role</h3>
        <div className="MACHR-role-dropdown-container">
          <button
            type="button"
            className={`MACHR-role-dropdown-button ${dropdownOpen ? 'open' : ''}`}
            onClick={() => setDropdownOpen(open => !open)}
          >
            <span className="MACHR-role-option-icon">
              {selectedRole?.icon}
              <span className="MACHR-role-option-label">{selectedRole?.label}</span>
            </span>
            <span className="MACHR-role-dropdown-arrow">
              {dropdownOpen ? '\u25B2' : '\u25BC'}
            </span>
          </button>
          {dropdownOpen && (
            <div className="MACHR-role-dropdown-content">
              {roleOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setRole(opt.value as Role);
                    setDropdownOpen(false);
                  }}
                  className={`MACHR-role-option ${role === opt.value ? 'selected' : ''}`}
                >
                  {opt.icon}
                  <div>
                    <div className="MACHR-role-option-label">{opt.label}</div>
                    <div className="MACHR-role-option-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="MACHR-role-description">
            {selectedRole?.desc}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="MACHR-form">
        {error && <div className="MACHR-error">{error}</div>}
        {localError && <div className="MACHR-error">{localError}</div>}
        <div className="MACHR-grid MACHR-md:grid-cols-2 MACHR-gap-4">
          <div className="MACH-form-group MACHR-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="MACH-form-group MACHR-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="MACH-form-group MACHR-form-group">
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

        <div className="MACHR-grid MACHR-md:grid-cols-2 MACHR-gap-4">
          <div className="MACH-form-group MACHR-form-group">
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

          <div className="MACH-form-group MACHR-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="MACHR-btn primary" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="MACHR-social-section">
        <div className="MACHR-divider">or continue with</div>
        <div className="MACHR-social-buttons-container">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="MACHR-social-button"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
