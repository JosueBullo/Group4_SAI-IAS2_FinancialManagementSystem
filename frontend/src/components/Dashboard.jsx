



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import IncomeChart from './IncomeChart';
// import ExpenseChart from './ExpenseChart';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);

//     useEffect(() => {
//         const fetchIncomes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/income/');
//                 setIncomes(response.data);
//             } catch (error) {
//                 console.error('Error fetching incomes:', error);
//             }
//         };

//         const fetchExpenses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/expenses/');
//                 setExpenses(response.data);
//             } catch (error) {
//                 console.error('Error fetching expenses:', error);
//             }
//         };

//         fetchIncomes();
//         fetchExpenses();
//     }, []);

//     return (
//         <div className="dashboard">
//             <h1>Dashboard</h1>
//             <div className="dashboard-buttons">
//                 <Link to="/income" className="dashboard-button">Income</Link>
//                 <Link to="/expense" className="dashboard-button">Expense</Link>
//                 <Link to="/report" className="dashboard-button">Report</Link>
//                 <Link to="/budget" className="dashboard-button">Budget</Link>
//             </div>
//             <div className="charts">
//                 <h2>Income Chart</h2>
//                 <IncomeChart incomes={incomes} />
//                 <h2>Expense Chart</h2>
//                 <ExpenseChart expenses={expenses} />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import TotalChart from './TotalChart'; // Import the TotalChart
import './Dashboard.css';

const Dashboard = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/income/');
                setIncomes(response.data);
            } catch (error) {
                console.error('Error fetching incomes:', error);
            }
        };

        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/expenses/');
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchIncomes();
        fetchExpenses();
    }, []);

    // Calculate total income and total expenses
    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-buttons">
                <Link to="/income" className="dashboard-button">Income</Link>
                <Link to="/expense" className="dashboard-button">Expense</Link>
                <Link to="/report" className="dashboard-button">Report</Link>
                <Link to="/budget" className="dashboard-button">Budget</Link>
            </div>
            <div className="charts">
                <h2>Total Income vs Total Expense</h2>
                <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} /> {/* Add the TotalChart */}
                <h2>Income Chart</h2>
                <IncomeChart incomes={incomes} />
                <h2>Expense Chart</h2>
                <ExpenseChart expenses={expenses} />
            </div>
        </div>
    );
};

export default Dashboard;
