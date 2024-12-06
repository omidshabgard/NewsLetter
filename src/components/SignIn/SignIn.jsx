import React, { useState } from 'react';
import styles from './SignIn.module.css';

import { InputField } from '../../components/InputField/InputField';
import { Success } from '../../components/SignInSucees/Success';

const SignIn = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [isPopupVisible, setIsPopupVisible] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const toggleSignUp = () => setIsSignUp((prev) => !prev);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateInputs = () => {
		const newErrors = {};
		if (isSignUp && !formData.username.trim()) {
			newErrors.username = 'Username is required.';
		}
		if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Valid email is required.';
		}
		if (!formData.password.trim() || formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long.';
		}
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = validateInputs();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			setIsSuccess(true);
			setIsPopupVisible(false);
		}
	};

	return (
		<main className={styles.container}>
			{/* Show Success Component when isSuccess is true */}
			{isSuccess && <Success />}

			{/* Show the Sign In/Sign Up form if isPopupVisible is true */}
			{isPopupVisible && (
				<form className={styles.formCard} onSubmit={handleSubmit}>
					<h1 className={styles.title}>
						{isSignUp ? 'Sign up' : 'Sign in'}
					</h1>

					{isSignUp && (
						<InputField
							label='Username'
							placeholder='Enter username'
							name='username'
							value={formData.username}
							onChange={handleInputChange}
							error={errors.username}
						/>
					)}

					<InputField
						label='Email'
						placeholder='Enter email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						error={errors.email}
					/>

					<InputField
						label='Password'
						placeholder='Enter password'
						name='password'
						type='password'
						value={formData.password}
						onChange={handleInputChange}
						error={errors.password}
					/>

					<button className={styles.signInButton} type='submit'>
						{isSignUp ? 'Sign up' : 'Sign in'}
					</button>

					<p className={styles.signUpText}>
						or{' '}
						<button
							type='button'
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
