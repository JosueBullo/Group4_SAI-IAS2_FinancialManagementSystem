import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Add this line


const Layout = ({ children }) => {
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
                                    Transactions
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/income">
                                            Income
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/expense">
                                            Expense
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/report">
                                    Report
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/budget">
                                    Budget
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Page content */}
            <div className="container-fluid">
                {children}
            </div>
        </div>
    );
};

export default Layout;
