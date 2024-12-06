import React from 'react';
import styles from './InputField.module.css';

export function InputField({
	label,
	placeholder,
	name,
	value,
	onChange,
	error,
}) {
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={label.toLowerCase() === 'password' ? 'password' : 'text'}
				className={`${styles.input} ${error ? styles.inputError : ''}`}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				aria-label={label}
				aria-invalid={!!error}
				aria-describedby={error ? `${name}-error` : undefined}
			/>
			{error && (
				<p id={`${name}-error`} className={styles.errorText}>
					{error}
				</p>
			)}
			<div className={styles.underline} />
		</div>
	);
}
