import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AuthForm.css'; // CSS file for styling forms
// const BASE_PATH = 'https://finalsemproject-backend.onrender.com';
const BASE_PATH = 'http://localhost:4000';
function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(BASE_PATH.concat('/api/users/login'), credentials);
            localStorage.setItem('token', response.data.accessToken);
            window.location.href = '/dashboard'; // Redirect on successful login
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Failed to login');
        }
    };

    return (
        <div className="auth-form">
            <img src="/DocSummary.png" alt="DocSummary Logo" className="logo" />
            <h1>DocSummary</h1>
            <form onSubmit={handleSubmit} className='internal-form'>
                <label>Email:</label>
                <input type="email" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
                <label>Password:</label>
                <input type="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
                <button type="submit">Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
}

export default Login;
