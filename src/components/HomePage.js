import React from 'react';
import '../styles/HomePage.css'; // Make sure the path to the CSS file is correct

function HomePage() {
    return (
        // <div className='main'>
            <div className="home-container">
                <img src="/DocSummary.png" alt="DocSummary Logo" className="logo" />
                <h1>Welcome to DocSummary</h1>
                <p>DocSummary automates the process of summarizing text documents using advanced machine learning techniques, making document handling efficient and user-friendly.</p>
                <div className="repo-links">
                    <a href="https://github.com/yourusername/backend-repo" className="repo-link">Backend Repo</a>
                    <a href="https://github.com/yourusername/ml-repo" className="repo-link">ML Logic Repo</a>
                </div>
            </div>
        // </div>
        
    );
}

export default HomePage;
