import * as React from "react";
import styles from './Success.module.css';

export function Success() {
  return (
    <div className={styles.successForm}>
      <div className={styles.successCard} role="main">
        <h1 className={styles.successTitle}>
          Registration successfully completed!
        </h1>
        <a 
          href="/signin" 
          className={styles.signInLink}
          tabIndex={0}
        >
          Sign in
        </a>
      </div>

      
    </div>
  );
}