import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBiking, FaUserAlt, FaStore } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';

type Role = 'delivery' | 'customer' | 'restaurant';

const SignUpForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('customer');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const roleOptions = [
    {
      value: 'delivery',
      label: 'Delivery Rider',
      icon: <FaBiking size={22} color="#4318D1" className="role-option-icon" />,
      desc: 'Deliver orders and earn money',
    },
    {
      value: 'customer',
      label: 'Customer',
      icon: <FaUserAlt size={22} color="#4318D1" className="role-option-icon" />,
      desc: 'Order food from restaurants',
    },
    {
      value: 'restaurant',
      label: 'Restaurant',
      icon: <FaStore size={22} color="#4318D1" className="role-option-icon" />,
      desc: 'Manage your restaurant and orders',
    },
  ];
  const selectedRole = roleOptions.find(r => r.value === role);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      // Replace with your actual endpoint
      const response = await axios.post('/api/auth/signup', {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        role,
      });
      // Handle success - navigate to dashboard
      console.log('Sign up success:', response.data);
      navigate('/restaurant-profile'); // Navigate to dashboard after successful sign up
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign up failed.');
    }
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log('Google sign up clicked');
    // For demo purposes, navigate to dashboard
    navigate('/restaurant-profile');
  };

  return (
    <div className="foodie-container">
      <h1 className="foodie-title">FoodieExpress</h1>
      <h2 className="foodie-subtitle">Join FoodieExpress!</h2>
      <p className="foodie-description">Create your account and start your journey</p>

      <div className="auth-tab-container">
        <button
          onClick={onSwitch}
          className="auth-tab-inactive"
        >
          Sign In
        </button>
        <button className="auth-tab-active">
          Sign Up
        </button>
      </div>

      <div className="role-section-custom">
        <h3 className="section-title">Select Your Role</h3>
        <div className="role-dropdown-container">
          <button
            type="button"
            className={`role-dropdown-button ${dropdownOpen ? 'open' : ''}`}
            onClick={() => setDropdownOpen(open => !open)}
          >
            <span className="role-option-icon">
              {selectedRole?.icon}
              <span className="role-option-label">{selectedRole?.label}</span>
            </span>
            <span className="role-dropdown-arrow">
              {dropdownOpen ? '\u25B2' : '\u25BC'}
            </span>
          </button>
          {dropdownOpen && (
            <div className="role-dropdown-content">
              {roleOptions.map(opt => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setRole(opt.value as Role);
                    setDropdownOpen(false);
                  }}
                  className={`role-option ${role === opt.value ? 'selected' : ''}`}
                >
                  {opt.icon}
                  <div>
                    <div className="role-option-label">{opt.label}</div>
                    <div className="role-option-desc">{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="role-description">
            {selectedRole?.desc}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="foodie-form">
        {error && <div className="error">{error}</div>}
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <button type="submit" className="foodie-btn primary">
          Create Account
        </button>
      </form>

      <div className="social-section">
        <div className="divider">or continue with</div>
        <div className="social-buttons-container">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="social-button"
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