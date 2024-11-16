// import React, { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import * as XLSX from 'xlsx';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './Dashboard.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ExpensePage = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchExpenses();
//     }, []);

//     const fetchExpenses = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/expenses/');
//             setExpenses(response.data);
//         } catch (err) {
//             setError('Error fetching expenses. Please try again later.');
//             console.error(err);
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
//         } catch (err) {
//             setError('Error saving expense. Please try again.');
//             console.error(err);
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
//         } catch (err) {
//             setError('Error deleting expense. Please try again.');
//             console.error(err);
//         }
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(13);
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

//     const calculateTotalExpenses = useMemo(
//         () => expenses.reduce((total, expense) => total + Number(expense.amount), 0),
//         [expenses]
//     );

//     const chartData = useMemo(() => ({
//         labels: expenses.map((expense) => expense.category),
//         datasets: [
//             {
//                 label: 'Expense Amounts',
//                 data: expenses.map((expense) => expense.amount),
//                 backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             },
//         ],
//     }), [expenses]);

//     return (
//         <div className="container-fluid dashboard">
//             <header className="d-flex justify-content-between align-items-center my-4">
//                 {/* Back button aligned to the left */}
//                 <Link to="/" className="btn btn-outline-secondary btn-sm">
//                     <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
//                 </Link>

//                 {/* Title aligned to the right and smaller size */}
//                 <h3 className="text-danger" style={{ fontSize: '1.5rem' }}>Expense Management</h3> {/* Reduced size */}
//             </header>

//             {error && <div className="alert alert-danger text-center">{error}</div>}

//             <div className="row">
//                 {/* Form Section */}
//                 <div className="col-md-4">
//                     <form onSubmit={handleSubmit} className="mb-4 card">
//                         <div className="card-body">
//                             <h2 className="card-title">Add/Update Expense</h2>
//                             <div className="row g-3">
//                                 <div className="col-md-12">
//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         placeholder="Amount"
//                                         value={formData.amount}
//                                         onChange={handleInputChange}
//                                         className="form-control"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-md-12">
//                                     <input
//                                         type="text"
//                                         name="category"
//                                         placeholder="Category"
//                                         value={formData.category}
//                                         onChange={handleInputChange}
//                                         className="form-control"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-md-12">
//                                     <input
//                                         type="text"
//                                         name="description"
//                                         placeholder="Description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="col-md-12">
//                                     <input
//                                         type="date"
//                                         name="date"
//                                         value={formData.date}
//                                         onChange={handleInputChange}
//                                         className="form-control"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <button type="submit" className="btn btn-danger mt-3 w-100">
//                                 {editingId ? 'Update Expense' : 'Add Expense'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//                 {/* Data Table Section */}
//                 <div className="col-md-8 card">
//                     <div className="card-body">
//                         <h2 className="text-center text-danger">Expenses List</h2>
//                         <table className="table table-striped table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Amount</th>
//                                     <th>Category</th>
//                                     <th>Description</th>
//                                     <th>Date</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {expenses.map((expense, index) => (
//                                     <tr key={expense.id}>
//                                         <td>{index + 1}</td>
//                                         <td>₱ {Number(expense.amount).toLocaleString()}</td>
//                                         <td>{expense.category}</td>
//                                         <td>{expense.description}</td>
//                                         <td>{expense.date}</td>
//                                         <td>
//                                             <button
//                                                 onClick={() => handleEdit(expense)}
//                                                 className="btn btn-outline-primary btn-sm me-2"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(expense.id)}
//                                                 className="btn btn-outline-danger btn-sm"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <h3 className="text-center text-danger">Total Expenses: ₱ {calculateTotalExpenses.toLocaleString()}</h3>
//                     </div>
//                 </div>
//             </div>

//             {/* Chart Section */}
//             <h2 className="text-center text-danger" style={{ fontSize: '1.5rem' }}>Expense Chart</h2>
//             <div className="chart-container" style={{ maxWidth: '500px', margin: 'auto' }}>
//                 <Bar
//                     data={chartData}
//                     options={{
//                         responsive: true,
//                         maintainAspectRatio: true,
//                         scales: {
//                             x: { title: { display: true, text: 'Category' } },
//                             y: { title: { display: true, text: 'Amount' } },
//                         },
//                     }}
//                 />
//             </div>

//             {/* Export Buttons */}
//             <div className="d-flex justify-content-center my-4">
//                 <button onClick={exportToPDF} className="btn btn-outline-secondary me-3">
//                     Export to PDF
//                 </button>
//                 <button onClick={exportToExcel} className="btn btn-outline-secondary">
//                     Export to Excel
//                 </button>
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
    import ReactPaginate from 'react-paginate'; // Import the pagination component
    import './Dashboard.css';
    import Layout from './Layout'; // Import Layout component

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const ExpensePage = () => {
        const [expenses, setExpenses] = useState([]);
        const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
        const [editingId, setEditingId] = useState(null);
        const [error, setError] = useState('');
        const [currentPage, setCurrentPage] = useState(0); // State for current page
        const [expensesPerPage, setExpensesPerPage] = useState(5); // Number of expenses per page

        const categoryOptions = [
            'Food',
            'Transportation',
            'Entertainment',
            'Bills',
            'Health',
            'Education',
            'Water',
            'Water Bill',
            'Electric Bill',
        ];

        useEffect(() => {
            fetchExpenses();
        }, []);

        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/expenses/');
                setExpenses(response.data);
            } catch (err) {
                setError('Error fetching expenses. Please try again later.');
                console.error(err);
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
            } catch (err) {
                setError('Error saving expense. Please try again.');
                console.error(err);
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
            } catch (err) {
                setError('Error deleting expense. Please try again.');
                console.error(err);
            }
        };

        const exportToPDF = () => {
            const doc = new jsPDF();
            doc.setFontSize(13);
        
            // Add Title
            doc.text('Expense Report', 14, 20);
        
            // Create a header for the table
            let y = 30;
            doc.setFontSize(12);
            doc.text('Amount', 14, y);
            doc.text('Category', 60, y);
            doc.text('Description', 120, y);
            doc.text('Date', 170, y);
            y += 5;  // Adding space between header and data
        
            // Add Expenses Data
            expenses.forEach((expense) => {
                doc.text(`₱ ${expense.amount}`, 14, y);
                doc.text(expense.category, 60, y);
                doc.text(expense.description, 120, y);
                doc.text(expense.date, 170, y);
                y += 10;
            });
        
            // Add Total Expense at the bottom
            const totalExpense = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
            y += 10;  // Adding space before total
            doc.setFontSize(14);
            doc.text('Total Expense:', 14, y);
            doc.text(`₱ ${totalExpense}`, 60, y);
        
            // Save the PDF
            doc.save('expense-report.pdf');
        };
        

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(expenses);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
            XLSX.writeFile(workbook, 'expense-report.xlsx');
        };

        const calculateTotalExpenses = useMemo(
            () => expenses.reduce((total, expense) => total + Number(expense.amount), 0),
            [expenses]
        );

        const chartData = useMemo(() => ({
            labels: expenses.map((expense) => expense.category),
            datasets: [
                {
                    label: 'Expense Amounts',
                    data: expenses.map((expense) => expense.amount),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
            ],
        }), [expenses]);

        // Pagination Logic
        const indexOfLastExpense = (currentPage + 1) * expensesPerPage;
        const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
        const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

        const paginate = (pageNumber) => setCurrentPage(pageNumber.selected);

        return (
            <Layout>
                <div className="container-fluid dashboard">
                    <header className="d-flex justify-content-between align-items-center my-4">
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
                        </Link>
                        <h3 className="text-danger" style={{ fontSize: '1.5rem' }}>Expense Management</h3>
                    </header>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit} className="mb-4 card">
                                <div className="card-body">
                                    <h2 className="card-title">Add/Update Expense</h2>
                                    <div className="row g-3">
                                        <div className="col-md-12">
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
                                        <div className="col-md-12">
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="">Select Category</option>
                                                {categoryOptions.map((category, index) => (
                                                    <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="category"
                                                placeholder="Or type custom category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="description"
                                                placeholder="Description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-12">
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
                                    <button type="submit" className="btn btn-danger mt-3 w-100">
                                        {editingId ? 'Update Expense' : 'Add Expense'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-8 card">
                            <div className="card-body">
                                <h2 className="text-center text-danger">Expenses List</h2>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Amount</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentExpenses.map((expense, index) => (
                                            <tr key={expense.id}>
                                                <td>{index + 1}</td>
                                                <td>{expense.amount}</td>
                                                <td>{expense.category}</td>
                                                <td>{expense.description}</td>
                                                <td>{expense.date}</td>
                                                <td>
                                                    <button onClick={() => handleEdit(expense)} className="btn btn-primary btn-sm me-2">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(expense.id)} className="btn btn-danger btn-sm">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination Component */}
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(expenses.length / expensesPerPage)}
                                    onPageChange={paginate}
                                    containerClassName={"pagination justify-content-center"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center my-4">
                        <button onClick={exportToPDF} className="btn btn-outline-secondary me-3">
                            Export to PDF
                        </button>
                        <button onClick={exportToExcel} className="btn btn-outline-secondary">
                            Export to Excel
                        </button>
                    </div>

                    <h2 className="text-center text-danger" style={{ fontSize: '1.5rem' }}>Expense Chart</h2>
                    <div className="chart-container" style={{ maxWidth: '500px', margin: 'auto' }}>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                scales: {
                                    x: { title: { display: true, text: 'Category' } },
                                    y: { title: { display: true, text: 'Amount' } },
                                },
                            }}
                        />
                    </div>
                </div>
            </Layout>
        );
    };

    export default ExpensePage;
