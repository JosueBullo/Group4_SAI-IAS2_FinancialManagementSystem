import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncomePage from './components/IncomePage'; // Replace with your actual component
import ExpensePage from './components/ExpensePage'; // Ensure this file exists
import ReportPage from './components/ReportPage'; // Ensure this file exists
import BudgetPage from './components/BudgetPage'; // Ensure this file exists

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income" element={<IncomePage />} />
            <Route path="/expense" element={<ExpensePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/budget" element={<BudgetPage />} />
        </Routes>
    );
}

export default App;
