import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve user info from localStorage
        const storedUserId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');

        // If userId and username are available, update the state and mark as logged in
        if (storedUserId && storedUsername) {
            setIsLoggedIn(true);
            setUserId(storedUserId);
            setUsername(storedUsername);
        }
    }, []); // Only run once on component mount

    const handleLogout = () => {
        // Clear all data in local storage when logging out
        localStorage.clear();
        // Reload the window to reset the app state
        window.location.reload();
    };

    return (
        <div>
            {/* Sticky Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        <i className="fas fa-coins me-2"></i> Financial Management
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {/* Transactions Dropdown */}
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-exchange-alt me-2"></i> Transactions
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/income">
                                            <i className="fas fa-wallet me-2"></i> Income
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/expense">
                                            <i className="fas fa-credit-card me-2"></i> Expense
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/report">
                                    <i className="fas fa-chart-line me-2"></i> Report
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/budget">
                                    <i className="fas fa-dollar-sign me-2"></i> Budget
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#howItWorksModal"
                                >
                                    <i className="fas fa-info-circle me-2"></i> How it Works
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link">
                                            <i className="fas fa-user me-2"></i> {username} ({userId})
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <span
                                            className="nav-link"
                                            onClick={handleLogout}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-sign-out-alt me-2"></i> Logout
                                        </span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <i className="fas fa-sign-in-alt me-2"></i> Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            <i className="fas fa-user-plus me-2"></i> Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Page content */}
            <div className="container-fluid">{children}</div>

            {/* How it Works Modal */}
            <div
                className="modal fade"
                id="howItWorksModal"
                tabIndex="-1"
                aria-labelledby="howItWorksModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="howItWorksModalLabel">
                                How Our Financial Management System Works
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Our Financial Management System is designed to simplify the way you manage your finances.
                                Whether you're tracking income, managing expenses, or setting monthly budgets, our system
                                ensures you're in control of your financial health.
                            </p>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
