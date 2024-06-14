import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Make sure the path to the CSS file is correct

function HomePage() {
    return (
        // <div className='main'>
            <div className="home-container">
                <img src="/DocSummary.png" alt="DocSummary Logo" className="logo" />
                <h1>Welcome to DocSummary</h1>
                <p>DocSummary automates the process of summarizing text documents using advanced machine learning techniques, making document handling efficient and user-friendly.</p>
                <div className="repo-links">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Sign Up</Link>
                </div>
            </div>
        // </div>
        
    );
}

export default HomePage;
