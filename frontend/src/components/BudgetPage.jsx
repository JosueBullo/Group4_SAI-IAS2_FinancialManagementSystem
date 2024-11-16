import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Budget.css';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import ExpenseBudgetComparisonChart from './CategoryBudget';  // Import the chart
import ExpenseBudgetComparisonChart1 from './BudgetChart';  // Import the chart
import Layout from './Layout';  // Import Layout

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);  // You may also need to fetch expenses
    const categories = ['Food', 'Entertainment', 'Rent', 'Utilities', 'Transportation', 'Healthcare'];
    const navigate = useNavigate();

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
            setExpenses(response.data); // Make sure you have the expenses data
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
        fetchExpenses();  // Fetch expenses on mount
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

    const prepareChartData = () => {
        const monthlyData = {};
        const allCategories = new Set();

        budgets.forEach((budget) => {
            const monthKey = budget.month;
            if (!monthlyData[monthKey]) monthlyData[monthKey] = {};
            if (!monthlyData[monthKey][budget.category]) monthlyData[monthKey][budget.category] = 0;
            monthlyData[monthKey][budget.category] += budget.amount;
            allCategories.add(budget.category);
        });

        const labels = Object.keys(monthlyData).sort();
        const datasets = Array.from(allCategories).map((category) => ({
            label: category,
            data: labels.map((month) => monthlyData[month][category] || 0),
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            borderColor: 'black',
            borderWidth: 1,
        }));

        return { labels, datasets };
    };

    const { labels, datasets } = prepareChartData();

    // Export to Excel function
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(budgets);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Budgets');
        XLSX.writeFile(wb, 'budgets.xlsx');
    };

    // Export to PDF function
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
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h1 className="display-4 text-primary font-weight-bold small-title">Monthly Budget</h1>
                        <p className="lead text-muted">Track your income and expenses with ease</p>
                    </div>
                </div>

                {/* Back to Dashboard Button */}
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

                {/* Add/Edit Budget Form Section */}
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
                                            {categories.map((category, index) => (
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
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={() => setEditingId(null)}
                                                className="btn btn-secondary"
                                            >
                                                Cancel Edit
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Budget Entries Table Section */}
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

                {/* Export Buttons Section */}
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

                {/* Budget Comparison Chart */}
                <div className="row mt-4">
                    <div className="col-12">
                        <ExpenseBudgetComparisonChart budgets={budgets} expenses={expenses} />
                    </div>
                </div>

            </div>
            {/* Budget Comparison Chart */}
            <div className="row mt-4">
                    <div className="col-12">
                        <ExpenseBudgetComparisonChart1 budgets={budgets} expenses={expenses} />
                    </div>
                </div>

          
        </Layout>
    );
};

export default BudgetPage;
