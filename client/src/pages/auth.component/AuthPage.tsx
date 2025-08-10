import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './auth.css';

// AuthPage component to handle sign in/sign up switching
const AuthPage: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="MACH-auth-container">
      {showSignIn ? (
        <SignInForm onSwitch={() => setShowSignIn(false)} />
      ) : (
        <SignUpForm onSwitch={() => setShowSignIn(true)} />
      )}
    </div>
  );
};

export default AuthPage;
