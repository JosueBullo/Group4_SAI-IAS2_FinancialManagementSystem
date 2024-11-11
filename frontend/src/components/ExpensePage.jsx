

// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf'; 
// import * as XLSX from 'xlsx';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ExpensePage = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
//     const [editingId, setEditingId] = useState(null);

//     useEffect(() => {
//         fetchExpenses();
//     }, []);

//     const fetchExpenses = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/expenses/');
//             setExpenses(response.data);
//         } catch (error) {
//             console.error('Error fetching expenses:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingId) {
//                 await axios.put(`http://localhost:8000/api/expenses/${editingId}/`, formData);
//             } else {
//                 await axios.post('http://localhost:8000/api/expenses/', formData);
//             }
//             fetchExpenses();
//             setFormData({ amount: '', category: '', description: '', date: '' });
//             setEditingId(null);
//         } catch (error) {
//             console.error('Error saving expense:', error);
//         }
//     };

//     const handleEdit = (expense) => {
//         setFormData(expense);
//         setEditingId(expense.id);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/expenses/${id}/`);
//             fetchExpenses();
//         } catch (error) {
//             console.error('Error deleting expense:', error);
//         }
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(18);
//         doc.text('Expense Report', 14, 20);
//         let y = 30;

//         expenses.forEach((expense) => {
//             doc.text(`Amount: ${expense.amount} | Category: ${expense.category} | Description: ${expense.description} | Date: ${expense.date}`, 14, y);
//             y += 10;
//         });

//         doc.save('expense-report.pdf');
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(expenses);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
//         XLSX.writeFile(workbook, 'expense-report.xlsx');
//     };

//     const calculateTotalExpenses = () => {
//         return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
//     };

//     const chartData = useMemo(() => ({
//         labels: expenses.map(expense => expense.category),
//         datasets: [{
//             label: 'Expense Amounts',
//             data: expenses.map(expense => expense.amount),
//             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         }],
//     }), [expenses]);

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <h1>Expense Management</h1>
//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//                 <input
//                     type="number"
//                     name="amount"
//                     placeholder="Amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     required
//                     style={{ marginRight: '10px' }}
//                 />
//                 <input
//                     type="text"
//                     name="category"
//                     placeholder="Category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     style={{ marginRight: '10px' }}
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     placeholder="Description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                     style={{ marginRight: '10px' }}
//                 />
//                 <button type="submit">{editingId ? 'Update' : 'Add'} Expense</button>
//             </form>

//             <h2>Expenses List</h2>
//             <ul style={{ listStyleType: 'none', padding: '0' }}>
//                 {expenses.map((expense) => (
//                     <li key={expense.id} style={{ marginBottom: '10px' }}>
//                        ₱ {expense.amount} - {expense.category} - {expense.description} - {expense.date}
//                         <button onClick={() => handleEdit(expense)} style={{ marginLeft: '10px' }}>Edit</button>
//                         <button onClick={() => handleDelete(expense.id)} style={{ marginLeft: '5px' }}>Delete</button>
//                     </li>
//                 ))}
//             </ul>

//             <h3>Total Expenses: ₱ {calculateTotalExpenses()}</h3>

//             <button onClick={exportToPDF} style={{ marginRight: '10px' }}>Export to PDF</button>
//             <button onClick={exportToExcel}>Export to Excel</button>

//             <h2>Expense Chart</h2>
//             <div style={{ maxWidth: '600px', margin: 'auto' }}>
//                 <Bar 
//                     data={chartData} 
//                     options={{ 
//                         responsive: true, 
//                         maintainAspectRatio: true,
//                         aspectRatio: 2,
//                         scales: {
//                             x: { title: { display: true, text: 'Category' } },
//                             y: { title: { display: true, text: 'Amount' } }
//                         }
//                     }} 
//                 />
//             </div>
//         </div>
//     );
// };

// export default ExpensePage;
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/expenses/');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/expenses/${editingId}/`, formData);
            } else {
                await axios.post('http://localhost:8000/api/expenses/', formData);
            }
            fetchExpenses();
            setFormData({ amount: '', category: '', description: '', date: '' });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving expense:', error);
        }
    };

    const handleEdit = (expense) => {
        setFormData(expense);
        setEditingId(expense.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/expenses/${id}/`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Expense Report', 14, 20);
        let y = 30;

        expenses.forEach((expense) => {
            doc.text(`Amount: ${expense.amount} | Category: ${expense.category} | Description: ${expense.description} | Date: ${expense.date}`, 14, y);
            y += 10;
        });

        doc.save('expense-report.pdf');
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(expenses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        XLSX.writeFile(workbook, 'expense-report.xlsx');
    };

    const calculateTotalExpenses = () => {
        return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    };

    const chartData = useMemo(() => ({
        labels: expenses.map(expense => expense.category),
        datasets: [{
            label: 'Expense Amounts',
            data: expenses.map(expense => expense.amount),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }],
    }), [expenses]);

    return (
        <div className="container-fluid dashboard">
            <header className="text-center my-4">
                <h1 className="display-4 text-danger">Expense Management</h1>
                <p className="lead text-secondary">Track and manage your expenses</p>
            </header>

            <div className="d-flex justify-content-end mb-4">
                <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-danger mt-3">{editingId ? 'Update' : 'Add'} Expense</button>
            </form>

            <h2 className="text-center text-danger">Expenses List</h2>
            <ul className="list-group mb-4">
                {expenses.map((expense) => (
                    <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center">
                        ₱ {expense.amount} - {expense.category} - {expense.description} - {expense.date}
                        <div>
                            <button onClick={() => handleEdit(expense)} className="btn btn-sm btn-outline-primary me-2">Edit</button>
                            <button onClick={() => handleDelete(expense.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <h3 className="text-center text-danger">Total Expenses: ₱ {calculateTotalExpenses()}</h3>

            <div className="d-flex justify-content-center my-4">
                <button onClick={exportToPDF} className="btn btn-outline-secondary me-3">Export to PDF</button>
                <button onClick={exportToExcel} className="btn btn-outline-secondary">Export to Excel</button>
            </div>

            <h2 className="text-center text-danger">Expense Chart</h2>
            <div className="chart-container" style={{ maxWidth: '600px', margin: 'auto' }}>
                <Bar 
                    data={chartData} 
                    options={{ 
                        responsive: true, 
                        maintainAspectRatio: true,
                        scales: {
                            x: { title: { display: true, text: 'Category' } },
                            y: { title: { display: true, text: 'Amount' } }
                        }
                    }} 
                />
            </div>
        </div>
    );
};

export default ExpensePage;
