// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import IncomeChart from './IncomeChart';
// import ExpenseChart from './ExpenseChart';
// import TotalChart from './TotalChart';
// import BudgetChart2 from './BudgetChart2'; // Import the new BudgetChart
// import ExpenseBudgetComparisonChart from './CategoryBudget'; // Import the ExpenseBudgetComparisonChart
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [budgets, setBudgets] = useState([]); // State for budget data
//     const navigate = useNavigate();

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

//         const fetchBudgets = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/budget/');
//                 setBudgets(response.data);
//             } catch (error) {
//                 console.error('Error fetching budgets:', error);
//             }
//         };

//         fetchIncomes();
//         fetchExpenses();
//         fetchBudgets(); // Fetch budget data
//     }, []);

//     const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
//     const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
//     const remainingBalance = totalIncome - totalExpense; // Calculate the remaining balance

//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         navigate('/login');
//     };

//     return (
//         <div className="container-fluid dashboard">
//             <header className="text-center my-4">
//                 <h1 className="text-primary">Financial Management System</h1>
//                 <p className="text-secondary">Overview of your financial data at a glance</p>
//                 <button onClick={handleLogout} className="btn btn-outline-danger">
//                     Logout
//                 </button>
//             </header>
            
//             <div className="row mb-4 justify-content-center">
//                 <div className="col d-flex justify-content-center gap-3">
//                     <Link to="/income" className="btn btn-outline-primary btn-lg">
//                         <i className="fas fa-peso-sign me-2"></i> Income
//                     </Link>
//                     <Link to="/expense" className="btn btn-outline-danger btn-lg">
//                         <i className="fas fa-money-bill-wave me-2"></i> Expense
//                     </Link>
//                     <Link to="/report" className="btn btn-outline-secondary btn-lg">
//                         <i className="fas fa-file-alt me-2"></i> Report
//                     </Link>
//                     <Link to="/budget" className="btn btn-outline-success btn-lg">
//                         <i className="fas fa-chart-pie me-2"></i> Budget
//                     </Link>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-primary">Total Income vs Total Expense</h2>
//                             <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} />
//                             <div className="mt-3">
//                                 <span className="badge bg-primary p-2 me-2">Income: ₱{totalIncome}</span>
//                                 <span className="badge bg-danger p-2">Expense: ₱{totalExpense}</span>
//                                 <div className="mt-2">
//                                     <span className="badge bg-success p-2">Remaining Balance: ₱{remainingBalance}</span> {/* Display the remaining balance */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Place the Budget Allocation in its own container */}
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-warning">Budget Allocation Per Month</h2>
//                             <BudgetChart2 budgets={budgets} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Add a separate container for Expense vs Budget Comparison */}
//             <div className="row">
//                 <div className="col-lg-12 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-info">Expense vs Budget Comparison</h2>
//                             <ExpenseBudgetComparisonChart expenses={expenses} budgets={budgets} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-success">Income Breakdown</h2>
//                             <IncomeChart incomes={incomes} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-danger">Expense Breakdown</h2>
//                             <ExpenseChart expenses={expenses} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import IncomeChart from './IncomeChart';
// import ExpenseChart from './ExpenseChart';
// import TotalChart from './TotalChart';
// import BudgetChart2 from './BudgetChart2';
// import ExpenseBudgetComparisonChart from './CategoryBudget';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [budgets, setBudgets] = useState([]);
//     const navigate = useNavigate();

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

//         const fetchBudgets = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/budget/');
//                 setBudgets(response.data);
//             } catch (error) {
//                 console.error('Error fetching budgets:', error);
//             }
//         };

//         fetchIncomes();
//         fetchExpenses();
//         fetchBudgets();
//     }, []);

//     const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
//     const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
//     const remainingBalance = totalIncome - totalExpense;

//     const handleLogout = () => {
//         localStorage.removeItem('authToken');
//         navigate('/login');
//     };

//     return (
//         <div className="container-fluid dashboard">
//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
//                 <div className="container">
//                     <Link className="navbar-brand fw-bold" to="/">
//                         <i className="fas fa-coins me-2"></i> Financial Management
//                     </Link>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarNav"
//                         aria-controls="navbarNav"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav me-auto">
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/income">
//                                     Income
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/expense">
//                                     Expense
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/report">
//                                     Report
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/budget">
//                                     Budget
//                                 </Link>
//                             </li>
//                         </ul>
//                         <button
//                             onClick={handleLogout}
//                             className="btn btn-outline-light ms-auto"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Dashboard Content */}
//             <header className="text-center my-4">
//                 <h1 className="text-primary">Dashboard Overview</h1>
//                 <p className="text-secondary">Manage and analyze your finances efficiently</p>
//             </header>

//             <div className="row">
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-primary">Total Income vs Total Expense</h2>
//                             <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} />
//                             <div className="mt-3">
//                                 <span className="badge bg-primary p-2 me-2">Income: ₱{totalIncome}</span>
//                                 <span className="badge bg-danger p-2">Expense: ₱{totalExpense}</span>
//                                 <div className="mt-2">
//                                     <span className="badge bg-success p-2">Remaining Balance: ₱{remainingBalance}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-warning">Budget Allocation Per Month</h2>
//                             <BudgetChart2 budgets={budgets} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-lg-12 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-info">Expense vs Budget Comparison</h2>
//                             <ExpenseBudgetComparisonChart expenses={expenses} budgets={budgets} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-success">Income Breakdown</h2>
//                             <IncomeChart incomes={incomes} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-danger">Expense Breakdown</h2>
//                             <ExpenseChart expenses={expenses} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import TotalChart from './TotalChart';
import BudgetChart2 from './BudgetChart2';
import ExpenseBudgetComparisonChart from './CategoryBudget';
import Layout from './Layout'; // Import Layout
import './Dashboard.css';

const Dashboard = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);

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

        const fetchBudgets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/budget/');
                setBudgets(response.data);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchIncomes();
        fetchExpenses();
        fetchBudgets();
    }, []);

    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
    const remainingBalance = totalIncome - totalExpense;

    return (
        <Layout>
            {/* Main Dashboard Content */}
            <div className="content">
                <header className="text-center my-4">
                    <h1 className="text-primary">Dashboard Overview</h1>
                    <p className="text-secondary">Manage and analyze your finances efficiently</p>
                </header>

                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center">
                                <h2 className="card-title text-primary">Total Income vs Total Expense</h2>
                                <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} />
                                <div className="mt-3">
                                    <span className="badge bg-primary p-2 me-2">Income: ₱{totalIncome}</span>
                                    <span className="badge bg-danger p-2">Expense: ₱{totalExpense}</span>
                                    <div className="mt-2">
                                        <span className="badge bg-success p-2">Remaining Balance: ₱{remainingBalance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center">
                                <h2 className="card-title text-warning">Budget Allocation Per Month</h2>
                                <BudgetChart2 budgets={budgets} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center">
                                <h2 className="card-title text-info">Expense vs Budget Comparison</h2>
                                <ExpenseBudgetComparisonChart expenses={expenses} budgets={budgets} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center">
                                <h2 className="card-title text-success">Income Breakdown</h2>
                                <IncomeChart incomes={incomes} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center">
                                <h2 className="card-title text-danger">Expense Breakdown</h2>
                                <ExpenseChart expenses={expenses} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
