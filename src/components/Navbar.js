import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Make sure the path to the CSS file is correct

function Navbar() {
    return (
         <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <img src="/ReportSage1.png" alt="DocSummary Logo" className="navbar-logo" />
                ReportSage
            </Link>
            <div className="repo-links">
                    <a href="https://github.com/yourusername/backend-repo" className="repo-link">Backend Repo</a>
                    <a href="https://github.com/yourusername/ml-repo" className="repo-link">LLM Repo</a>
            </div>
        </nav>
    );
}

export default Navbar;
