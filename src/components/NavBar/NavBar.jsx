import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import SignIn from '../../Pages/SignIn/SignIn';

const NavBar = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isSavedArticles = location.pathname === "/saved-articles";
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleSignInClick = () => {
        setPopupVisible(true);
    };

    const handleLogOutClick = () => {
        alert('Logged out'); 
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <nav

className={`${styles.navigation} ${
    isHome ? styles.home : styles['saved-articles']
} ${isMenuOpen ? styles.menuOpen : ''}`} 
            >
                <h1 className={styles.logo}>NewsExplorer</h1>

                <div className={styles.hamburger} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                </div>

                <div
                    className={`${styles.navLinks} ${
                        isMenuOpen ? styles.open : ''
                    }`}
                >
                           <Link
                to="/"
                className={`${styles.navLink} ${
                    location.pathname === '/' ? styles.active : ''
                }`}
            >
                Home
            </Link>
            <Link
                to="/saved-articles"
                className={`${styles.navLink} ${
                    location.pathname === '/saved-articles' ? styles.active : ''
                }`}
            >
                Saved Articles
            </Link>

                    {isSavedArticles ? (
                        <button
                            className={styles.signInButton}
                            onClick={handleLogOutClick}
                        >
                            Log out
                        </button>
                    ) : (
                        <button
                            className={styles.signInButton}
                            onClick={handleSignInClick}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </nav>

            <div
                className={`${styles.popupOverlay} ${
                    isPopupVisible ? styles.active : ''
                }`}
            >
                <div className={styles.popupContent}>
                    <button className={styles.popupClose} onClick={closePopup}>
                        X
                    </button>
                    <SignIn />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
