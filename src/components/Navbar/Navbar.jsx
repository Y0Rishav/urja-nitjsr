import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const logo = '/urja-logo-white.png';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        // Toggle the state
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const closeMenu = () => {
        // Close the menu after clicking a link
        setIsOpen(false);
    };

    // 🔑 SCROLL LOCK EFFECT: Adds/Removes the class from the body
    useEffect(() => {
        if (isOpen) {
            // Add the class 'no-scroll' to lock the main page scroll
            document.body.classList.add('no-scroll');
        } else {
            // Remove the class to unlock the main page scroll
            document.body.classList.remove('no-scroll');
        }

        // Cleanup: Important to ensure scroll is restored if the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <nav className="navbar">
            {/* Logo */}
            <img
                src={logo}
                alt="URJA Logo"
                // The logo hides when the menu is open to give space
                className={`navbar-logo ${isOpen ? 'hide-logo' : ''}`}
            />

            {/* Hamburger / Close Button */}
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            {/* Navigation Links (The full-screen overlay) */}
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                {/* Close button X is part of the hamburger logic, but you can add a separate one for clarity */}

                <li><Link to="/" className="home-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/team" className="team-link" onClick={closeMenu}>Team</Link></li>
                <li><Link to="/sports" className="sports-link" onClick={closeMenu}>Sports</Link></li>
                <li><Link to="/gallery" className="gallery-link" onClick={closeMenu}>Gallery</Link></li>
                <li><Link to="/pool" className="pool-link" onClick={closeMenu}>Pool</Link></li>
                <li><Link to="/branch-leaderboard" className="branch-leaderboard-link" onClick={closeMenu}>Branch Leaderboard</Link></li>
                <li><Link to="/points-table" className="points-table-link" onClick={closeMenu}>Points Table</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;