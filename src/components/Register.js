import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForm.css'; // Use the same CSS file for consistent styling
// const BASE_PATH = 'https://finalsemproject-backend.onrender.com';
const BASE_PATH = 'http://localhost:4000';



function Register() {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(BASE_PATH.concat('/api/users/register'), user);
            // Redirect to login page on successful registration
            window.location.href = '/login';
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-form">
            <img src="/DocSummary.png" alt="DocSummary Logo" className="logo" />
            <h1>DocSummary</h1>
            <form onSubmit={handleSubmit} className='internal-form'>
                <label>Username:</label>
                <input type="text" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
                <label>Email:</label>
                <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                <label>Password:</label>
                <input type="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                <button type="submit">Sign Up</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Register;
