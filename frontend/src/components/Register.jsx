import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Correct import for React Router v6
import { Link } from 'react-router-dom';  // Import the Link component
import './Register.css'; // Assuming you'll create a separate CSS file for styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Hook to navigate to another route

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', { username, password });
            setMessage(response.data.message);

            if (response.data.success) {
                // Reset the form fields
                setUsername('');
                setPassword('');
                
                // Redirect to the login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            setMessage("Registration failed or User Already exist.");
        }
    };

    // Handle the Exit button click to navigate back to the dashboard
    const handleExit = () => {
        navigate('/');  // Redirect to the dashboard (or home page)
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                {message && <p className="message">{message}</p>}

                {/* Link to login page */}
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

                {/* Exit button to go back to dashboard */}
                <div className="exit-button">
                    <button onClick={handleExit} className="exit-btn">
                        Exit to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
