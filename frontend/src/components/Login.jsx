import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import for React Router v6
import { Link } from 'react-router-dom';  // Import the Link component
import './Login.css'; // Assuming you'll create a separate CSS file for styles

const Login = () => {
    const [username, setUsername] = useState('');  // Username entered by user
    const [password, setPassword] = useState('');  // Password entered by user
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Function to decode the JWT token manually
    const decodeTokenManually = (token) => {
        try {
            const base64Url = token.split(".")[1]; // Get payload part of the token
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const decodedData = JSON.parse(window.atob(base64));
            console.log("Decoded Token:", decodedData);
            return decodedData; // Return decoded token data
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send login request to backend
            const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
    
            // Log the response data to check if username and user_id are present
            console.log("Login Response:", response.data);
    
            // Check if the response contains the necessary data
            if (response.data.access && response.data.user_id && response.data.username) {
                // Decode the JWT token manually
                const userInfo = decodeTokenManually(response.data.access);
                console.log("User Info:", userInfo);
    
                // Save tokens and user information into localStorage
                localStorage.setItem('access_token', response.data.access); // Store access token
                localStorage.setItem('refresh_token', response.data.refresh); // Store refresh token
                localStorage.setItem('userId', response.data.user_id); // Store user ID from response
                localStorage.setItem('username', response.data.username); // Store username from response
    
                setMessage("Login successful!");
                navigate('/'); // Redirect to the homepage or dashboard
            } else {
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
            console.error("Error during login:", error);
        }
    };
    
    
    // Handle the Exit button click to navigate back to the dashboard
    const handleExit = () => {
        navigate('/');  // Redirect to the dashboard (or home page)
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}  // Handle username input
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Handle password input
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                {message && <p className="message">{message}</p>}

                {/* Text Link to Register page */}
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
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

export default Login;
