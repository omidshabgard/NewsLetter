import * as React from "react";
import styles from './NothingFound.module.css';

export default function NothingFound() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.messageContainer}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4e276c444d7d43600195a037b98b3cc26c5d313c36e11b0f058a5f2e2fbf1e7?placeholderIfAbsent=true&apiKey=7363b875f3184f43be2615892aabff5b"
            className={styles.notFoundIcon}
            alt="Nothing found icon"
          />
          <h1 className={styles.title}>Nothing found</h1>
          <p className={styles.description}>
            Sorry, but nothing matched <br />
            your search terms.
          </p>
        </div>
      </div>
    </div>
  );
}