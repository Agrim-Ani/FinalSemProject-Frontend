import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Make sure the path to the CSS file is correct

function HomePage() {
    return (
        // <div className='main'>
            <div className="home-container">
                <img src="/ReportSage1.png" alt="DocSummary Logo" className="logo" />
                <h1>Welcome to ReportSage</h1>
                <p>ReportSage is a LLM tool engineered to analyze Earning Calls, Investor Reports & Financial transcribed conversation/documents.<br></br>
                Powered by GROQ - AI Inference Engine offering the capabilities of latest state of the art Large Language models.</p>
                <div className="repo-links">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Sign Up</Link>
                </div>
            </div>
        // </div>
        
    );
}

export default HomePage;
