import React, { useState } from 'react';
import styles from './SignIn.module.css';

import { InputField } from '../../components/InputField/InputField';
import { Success } from '../../components/SignInSucees/Success';


const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Track popup visibility
  const [isSuccess, setIsSuccess] = useState(false); // Track success message visibility

  const toggleSignUp = () => setIsSignUp((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    // If it's Sign Up, show the success message and hide the form (popup)
    setIsSuccess(true);
    setIsPopupVisible(false); // Hide the form/popup when the user clicks "Sign in"
  };

  return (
    <main className={styles.container}>
      {/* Show Success Component when isSuccess is true */}
      {isSuccess && <Success />}

      {/* Show the Sign In/Sign Up form if isPopupVisible is true */}
      {isPopupVisible && (
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h1 className={styles.title}>{isSignUp ? 'Sign up' : 'Sign in'}</h1>

          {isSignUp && (
            <InputField 
              label="Username"
              placeholder="Enter username"
            />
          )}

          <InputField 
            label="Email"
            placeholder="Enter email"
          />
          
          <InputField 
            label="Password"
            placeholder="Enter password"
          />

          <button className={styles.signInButton} type="submit">
            {isSignUp ? 'Sign up' : 'Sign in'}
          </button>

          <p className={styles.signUpText}>
            or{' '}
            <button
              type="button"
              className={styles.signUpLink}
              onClick={toggleSignUp}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </form>
      )}
    </main>
  );
};

export default SignIn;
