// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Budget.css';
// import * as XLSX from 'xlsx';
// import { jsPDF } from 'jspdf';
// import Layout from './Layout';  // Import Layout
// import ExpenseBudgetComparisonChart from './CategoryBudget';  // Adjust the path based on your folder structure
// // import BudgetChart2 from './BudgetChart2';  // Adjust the path based on your folder structure
// // import ExpenseBudgetComparisonChart from './ExpenseBudgetComparisonChart';  // Import the new chart

// const BudgetPage = () => {
//     const [budgets, setBudgets] = useState([]);
//     const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '', user: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState(null);
//     const [expenses, setExpenses] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUserId = localStorage.getItem('userId');
//         setNewEntry((prevData) => ({
//             ...prevData, // Spread the previous data to keep all other fields
//             user: storedUserId, // Add userId to the user field or set to empty string if not found
//         }));
//     }, []);

//     const categoryOptions = [
//         'Food',
//         'Transportation',
//         'Entertainment',
//         'Bills',
//         'Health',
//         'Education',
//         'Utilities', // Combines "Water", "Water Bill", and "Electric Bill"
//         'Savings',
//         'Miscellaneous',
//     ];
    

//     const fetchBudgets = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/budget/');
//             const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//             const filteredBudgets = response.data.filter((budget) => budget.user == userId);
//             setBudgets(filteredBudgets);
//         } catch (error) {
//             console.error('Error fetching budgets:', error);
//         }
//     };
    
//     const fetchExpenses = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/expenses/');
//             const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//             const filteredExpenses = response.data.filter((expense) => expense.user == userId);
//             setExpenses(filteredExpenses);
//         } catch (error) {
//             console.error('Error fetching expenses:', error);
//         }
//     };
    

//     useEffect(() => {
//         fetchBudgets();
//         fetchExpenses();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewEntry({ ...newEntry, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(newEntry)
//         try {
//             const formattedMonth = newEntry.month ? `${newEntry.month}-01` : '';
//             const updatedEntry = { ...newEntry, month: formattedMonth };
//             if (editingId) {
//                 await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, updatedEntry);
//                 alert('Budget entry updated successfully!');
//             } else {
//                 const res = await axios.post('http://127.0.0.1:8000/api/budget/', updatedEntry);
//                 alert('Budget entry saved successfully!');
//             }
//             setNewEntry({ category: '', amount: '', month: '' });
//             setEditingId(null);
//             fetchBudgets();
//         } catch (error) {
//             setError(error.response ? error.response.data : 'An error occurred');
//         }
//     };

//     const handleEdit = (budget) => {
//         setNewEntry(budget);
//         setEditingId(budget.id);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/budget/${id}/`);
//             alert('Budget entry deleted successfully!');
//             fetchBudgets();
//         } catch (error) {
//             console.error('Error deleting budget entry:', error);
//         }
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(budgets);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Budgets');
//         XLSX.writeFile(wb, 'budgets.xlsx');
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(12);
//         doc.text('Monthly Budget', 10, 10);
    
//         // Prepare the table data
//         const tableData = budgets.map(budget => [
//             budget.category, 
//             budget.amount, 
//             budget.month ? budget.month.split('-').slice(0, 2).join('-') : '' // Format the month as 'YYYY-MM'
//         ]);
    
//         // Generate the table using autoTable
//         doc.autoTable({
//             head: [['Category', 'Amount', 'Month']],
//             body: tableData,
//             startY: 20,
//         });
    
//         // Save the PDF
//         doc.save('budgets.pdf');
//     };
    
//     return (
//         <Layout>
//             <div className="container-fluid bg-light py-5 min-vh-100">
//                 <div className="row mb-4">
//                     <div className="col-12 text-center">
//                         <h1 className="display-4 text-primary font-weight-bold small-title">Monthly Budget</h1>
//                         <p className="lead text-muted">Track your income and expenses with ease</p>
//                     </div>
//                 </div>

//                 <div className="row mb-4">
//                     <div className="col-12 text-start">
//                         <button
//                             className="btn btn-link text-dark"
//                             onClick={() => navigate('/')}
//                         >
//                             <span className="bi bi-arrow-left-circle"></span> Back to Dashboard
//                         </button>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-lg-6 col-md-12 mb-4">
//                         <div className="card shadow-lg rounded">
//                             <div className="card-header bg-primary text-white">
//                                 <h4 className="mb-0">Add / Edit Budget Entry</h4>
//                             </div>
//                             <div className="card-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="category" className="form-label">Category</label>
//                                         <input
//                                             type="text"
//                                             id="category"
//                                             name="category"
//                                             value={newEntry.category}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                             placeholder="Enter or select a category"
//                                             list="category-suggestions"
//                                             required
//                                         />
//                                         <datalist id="category-suggestions">
//                                             {categoryOptions.map((category, index) => (
//                                                 <option key={index} value={category} />
//                                             ))}
//                                         </datalist>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="amount" className="form-label">Amount</label>
//                                         <input
//                                             type="number"
//                                             id="amount"
//                                             name="amount"
//                                             value={newEntry.amount}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="month" className="form-label">Month</label>
//                                         <input
//                                             type="month"
//                                             id="month"
//                                             name="month"
//                                             value={newEntry.month}
//                                             onChange={handleChange}
//                                             className="form-control"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="d-grid gap-2">
//                                         <button type="submit" className="btn btn-success">
//                                             {editingId ? 'Update Entry' : 'Add Entry'}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-lg-6 col-md-12 mb-4">
//                         <div className="card shadow-lg rounded">
//                             <div className="card-header bg-primary text-white">
//                                 <h4 className="mb-0">Budget Entries</h4>
//                             </div>
//                             <div className="card-body">
//                                 <table className="table table-hover">
//                                     <thead>
//                                         <tr>
//                                             <th>Category</th>
//                                             <th>Amount</th>
//                                             <th>Month</th>
//                                             <th>UserID</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {budgets.map(budget => (
//                                             budget.user == localStorage.getItem('userId') ? (
//                                                 <tr key={budget.id}>
//                                                     <td>{budget.category}</td>
//                                                     <td>{budget.amount}</td>
//                                                     <td>{budget.user}</td>
//                                                     <td>{budget.month}</td>
//                                                     <td>
//                                                         <button
//                                                             className="btn btn-warning btn-sm"
//                                                             onClick={() => handleEdit(budget)}
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-danger btn-sm"
//                                                             onClick={() => handleDelete(budget.id)}
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ) : (
//                                                 null
//                                             )

//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row">
//                     <div className="col-lg-12 mb-4">
//                         <div className="card shadow-lg border-0">
//                             <div className="card-body text-center">
//                                 <h2 className="card-title text-info">Expense vs Budget Comparison</h2>
//                                 <ExpenseBudgetComparisonChart expenses={expenses} budgets={budgets} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row mt-4">
//                     <div className="col-12">
//                         <button onClick={exportToExcel} className="btn btn-success me-2">
//                             Export to Excel
//                         </button>
                       
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default BudgetPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Budget.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import Layout from './Layout';
import ExpenseBudgetComparisonChart from './CategoryBudget';

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [newEntry, setNewEntry] = useState({
        category: '',
        customCategory: '',
        amount: '',
        month: '',
        user: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const categoryOptions = [
        'Food',
        'Transportation',
        'Entertainment',
        'Water Bills',
        'Electric Bills',
        'Health',
        'Education',
        'Utilities',
        'Miscellaneous',
        'Hang Out'
    ];

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setNewEntry((prevData) => ({
            ...prevData,
            user: storedUserId,
        }));
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/budget/');
            const userId = localStorage.getItem('userId');
            const filteredBudgets = response.data.filter((budget) => budget.user == userId);
            setBudgets(filteredBudgets);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/expenses/');
            const userId = localStorage.getItem('userId');
            const filteredExpenses = response.data.filter((expense) => expense.user == userId);
            setExpenses(filteredExpenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
        fetchExpenses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedMonth = newEntry.month ? `${newEntry.month}` : '';
            const finalCategory = newEntry.category === 'custom' ? newEntry.customCategory : newEntry.category;

            const updatedEntry = {
                ...newEntry,
                category: finalCategory,
                month: formattedMonth,
            };

            if (editingId) {
                await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, updatedEntry);
                alert('Budget entry updated successfully!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/budget/', updatedEntry);
                alert('Budget entry saved successfully!');
            }

            // Reset the form and state
            const userId = localStorage.getItem('userId');
            setNewEntry({ category: '', customCategory: '', amount: '', month: '', user: userId });
            setEditingId(null);

            fetchBudgets();
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    const handleEdit = (budget) => {
        setNewEntry({ ...budget, customCategory: '' });
        setEditingId(budget.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/budget/${id}/`);
            alert('Budget entry deleted successfully!');
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget entry:', error);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(budgets);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Budgets');
        XLSX.writeFile(wb, 'budgets.xlsx');
    };

    return (
        <Layout>
            <div className="container-fluid bg-light py-5 min-vh-100">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h1 className="display-4 text-primary font-weight-bold small-title">Monthly Budget</h1>
                        <p className="lead text-muted">Track your income and expenses with ease</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <div className="card shadow-lg rounded">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Add / Edit Budget Entry</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={newEntry.category}
                                            onChange={handleChange}
                                            className="form-select"
                                            required
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {categoryOptions.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>

                                    {newEntry.category === 'custom' && (
                                        <div className="mb-3">
                                            <label htmlFor="customCategory" className="form-label">Custom Category</label>
                                            <input
                                                type="text"
                                                id="customCategory"
                                                name="customCategory"
                                                value={newEntry.customCategory}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            value={newEntry.amount}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="month" className="form-label">Month</label>
                                        <input
                                            type="month"
                                            id="month"
                                            name="month"
                                            value={newEntry.month}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-success">
                                            {editingId ? 'Update Entry' : 'Add Entry'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 mb-4">
                        <div className="card shadow-lg rounded">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Budget Entries</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Month</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {budgets.map((budget) => (
                                            <tr key={budget.id}>
                                                <td>{budget.category}</td>
                                                <td>{budget.amount}</td>
                                                <td>{budget.month}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => handleEdit(budget)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(budget.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <ExpenseBudgetComparisonChart expenses={expenses} budgets={budgets} />
                
            <div className="row mt-4">
    <div className="col-12">
        <h4 className="text-center">Budget vs Expense Summary</h4>
        <table className="table table-bordered mt-3">
            <thead className="table-primary">
                <tr>
                    <th>Category</th>
                    <th>Total Budget</th>
                    <th>Total Expense</th>
                    <th>Difference</th>
                </tr>
            </thead>
            <tbody>
                {Array.from(new Set([...budgets.map((budget) => budget.category), ...expenses.map((expense) => expense.category)]))
                    .map((category) => {
                        // Calculate totals for the category
                        const totalBudget = budgets
                            .filter((budget) => budget.category === category)
                            .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
                        const totalExpense = expenses
                            .filter((expense) => expense.category === category)
                            .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
                        const difference = totalBudget - totalExpense;

                        // Ensure the category is shown even if there are no expenses
                        if (totalBudget === 0 && totalExpense === 0) {
                            return null;
                        }

                        return (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>{totalBudget.toFixed(2)}</td>
                                <td>{totalExpense === 0 ? 'No Expense' : totalExpense.toFixed(2)}</td>
                                <td className={difference < 0 ? 'text-danger' : 'text-success'}>
                                    {difference.toFixed(2)}
                                </td>
                            </tr>
                        );
                    })
                    .filter(Boolean)} {/* Filters out null/undefined rows */}
            </tbody>
        </table>
    </div>
</div>

                <div className="row mt-4">
                    <div className="col-12">
                        <button onClick={exportToExcel} className="btn btn-success me-2">
                            Export to Excel
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BudgetPage;
