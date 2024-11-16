import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Budget.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import Layout from './Layout';  // Import Layout
import CategoryBudget from './CategoryBudget';  // Adjust the path based on your folder structure
// import BudgetChart2 from './BudgetChart2';  // Adjust the path based on your folder structure
// import ExpenseBudgetComparisonChart from './ExpenseBudgetComparisonChart';  // Import the new chart

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const categoryOptions = [
        'Food', 'Transportation', 'Entertainment', 'Bills', 'Health', 'Education', 
        'Water', 'Water Bill', 'Electric Bill'
    ];

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/budget/');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
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
            const formattedMonth = newEntry.month ? `${newEntry.month}-01` : '';
            const updatedEntry = { ...newEntry, month: formattedMonth };
            if (editingId) {
                await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, updatedEntry);
                alert('Budget entry updated successfully!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/budget/', updatedEntry);
                alert('Budget entry saved successfully!');
            }
            setNewEntry({ category: '', amount: '', month: '' });
            setEditingId(null);
            fetchBudgets();
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    const handleEdit = (budget) => {
        setNewEntry(budget);
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

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Monthly Budget', 10, 10);

        const tableData = budgets.map(budget => [budget.category, budget.amount, budget.month]);
        doc.autoTable({
            head: [['Category', 'Amount', 'Month']],
            body: tableData,
            startY: 20,
        });

        doc.save('budgets.pdf');
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

                <div className="row mb-4">
                    <div className="col-12 text-start">
                        <button 
                            className="btn btn-link text-dark" 
                            onClick={() => navigate('/')}
                        >
                            <span className="bi bi-arrow-left-circle"></span> Back to Dashboard
                        </button>
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
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={newEntry.category}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Enter or select a category"
                                            list="category-suggestions"
                                            required
                                        />
                                        <datalist id="category-suggestions">
                                            {categoryOptions.map((category, index) => (
                                                <option key={index} value={category} />
                                            ))}
                                        </datalist>
                                    </div>
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
                                        {budgets.map(budget => (
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

                {/* Add Expense-Budget Comparison Chart */}
                <div className="row mt-4">
                    <div className="col-12">
                        <CategoryBudget expenses={expenses} budgets={budgets} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <button onClick={exportToExcel} className="btn btn-success me-2">
                            Export to Excel
                        </button>
                        <button onClick={exportToPDF} className="btn btn-danger">
                            Export to PDF
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BudgetPage;
