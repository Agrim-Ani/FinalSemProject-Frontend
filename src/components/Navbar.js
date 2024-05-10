import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Make sure the path to the CSS file is correct

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <img src="/DocSummary.png" alt="DocSummary Logo" className="navbar-logo" />
                DocSummary
            </Link>
            <div className="nav-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;
