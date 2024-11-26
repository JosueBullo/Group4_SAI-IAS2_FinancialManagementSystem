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
// import './Incomepage.css';
// import ReactPaginate from 'react-paginate';
// import Layout from './Layout'; // Import Layout

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const IncomePage = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         fetchIncomes();
//     }, []);

//     const fetchIncomes = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/income/');
//             setIncomes(response.data);
//         } catch (error) {
//             console.error('Error fetching incomes:', error);
//             setError('Failed to load incomes.');
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
//                 await axios.put(`http://localhost:8000/api/income/${editingId}/`, formData);
//                 alert('Income updated successfully!');
//             } else {
//                 await axios.post('http://localhost:8000/api/income/', formData);
//                 alert('Income added successfully!');
//             }
//             fetchIncomes();
//             setFormData({ amount: '', category: '', description: '', date: '' });
//             setEditingId(null);
//         } catch (error) {
//             console.error('Error saving income:', error);
//             setError('Failed to save income.');
//         }
//     };

//     const handleEdit = (income) => {
//         setFormData(income);
//         setEditingId(income.id);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/income/${id}/`);
//             alert('Income deleted successfully!');
//             fetchIncomes();
//         } catch (error) {
//             console.error('Error deleting income:', error);
//             setError('Failed to delete income.');
//         }
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(13);
//         doc.text('Income Report', 14, 20);
//         let y = 30;

//         incomes.forEach((income) => {
//             doc.text(
//                 `Amount: ${income.amount} | Category: ${income.category} | Description: ${income.description} | Date: ${income.date}`,
//                 14,
//                 y
//             );
//             y += 10;
//         });

//         doc.save('income-report.pdf');
//     };

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(incomes);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
//         XLSX.writeFile(workbook, 'income-report.xlsx');
//     };

//     const totalIncome = useMemo(() => {
//         return incomes.reduce((total, income) => total + Number(income.amount), 0);
//     }, [incomes]);

//     const chartData = useMemo(
//         () => ({
//             labels: incomes.map((income) => income.category),
//             datasets: [
//                 {
//                     label: 'Income Amounts',
//                     data: incomes.map((income) => income.amount),
//                     backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 },
//             ],
//         }),
//         [incomes]
//     );

//     // Paginate the incomes data
//     const currentIncomes = useMemo(() => {
//         const offset = currentPage * itemsPerPage;
//         return incomes.slice(offset, offset + itemsPerPage);
//     }, [incomes, currentPage]);

//     const handlePageClick = (data) => {
//         setCurrentPage(data.selected);
//     };

//     return (
//         <div className="container-fluid py-4">
//             <header className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                     <Link to="/" className="btn btn-outline-secondary btn-sm">
//                         <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
//                     </Link>
//                 </div>
//                 <h1 className="h4 text-primary mb-0">Income Management</h1>
//             </header>

//             {error && <div className="alert alert-danger text-center">{error}</div>}

//             <div className="row">
//                 {/* Form Section */}
//                 <div className="col-md-4 mb-4">
//                     <div className="card shadow-sm border-light">
//                         <div className="card-body">
//                             <h2 className="h6 text-dark mb-3">Add / Edit Income</h2>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         className="form-control"
//                                         placeholder="Enter amount"
//                                         value={formData.amount}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="category"
//                                         className="form-control"
//                                         placeholder="Enter category"
//                                         value={formData.category}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="description"
//                                         className="form-control"
//                                         placeholder="Enter description"
//                                         value={formData.description}
//                                         onChange={handleInputChange}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="date"
//                                         name="date"
//                                         className="form-control"
//                                         value={formData.date}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary w-100">
//                                     {editingId ? 'Update Income' : 'Add Income'}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Table Section */}
//                 <div className="col-md-8">
//                     <div className="card shadow-sm border-light mb-4">
//                         <div className="card-body">
//                             <h2 className="h6 text-dark mb-3">Income Records</h2>
//                             <table className="table table-striped">
//                                 <thead className="table-light">
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Amount</th>
//                                         <th>Category</th>
//                                         <th>Description</th>
//                                         <th>Date</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentIncomes.length === 0 ? (
//                                         <tr>
//                                             <td colSpan="6" className="text-center text-muted">
//                                                 No income records available. Add a new income to get started.
//                                             </td>
//                                         </tr>
//                                     ) : (
//                                         currentIncomes.map((income, index) => (
//                                             <tr key={income.id}>
//                                                 <td>{index + 1 + currentPage * itemsPerPage}</td>
//                                                 <td>₱ {income.amount}</td>
//                                                 <td>{income.category}</td>
//                                                 <td>{income.description}</td>
//                                                 <td>{income.date}</td>
//                                                 <td>
//                                                     <button
//                                                         onClick={() => handleEdit(income)}
//                                                         className="btn btn-sm btn-outline-secondary me-2"
//                                                     >
//                                                         Edit
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDelete(income.id)}
//                                                         className="btn btn-sm btn-outline-danger"
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </table>

//                             <ReactPaginate
//                                 previousLabel={'Previous'}
//                                 nextLabel={'Next'}
//                                 breakLabel={'...'}
//                                 pageCount={Math.ceil(incomes.length / itemsPerPage)}
//                                 marginPagesDisplayed={2}
//                                 pageRangeDisplayed={5}
//                                 onPageChange={handlePageClick}
//                                 containerClassName={'pagination justify-content-center'}
//                                 pageClassName={'page-item'}
//                                 pageLinkClassName={'page-link'}
//                                 previousClassName={'page-item'}
//                                 previousLinkClassName={'page-link'}
//                                 nextClassName={'page-item'}
//                                 nextLinkClassName={'page-link'}
//                                 activeClassName={'active'}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Total Income */}
//             <div className="row">
//                 <div className="col-md-12">
//                     <div className="card shadow-sm border-light mb-4">
//                         <div className="card-body">
//                             <h2 className="h6 text-dark mb-3">Total Income: ₱ {totalIncome}</h2>
//                             <Bar data={chartData} options={{ responsive: true }} width={300} height={150} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Export Buttons */}
//             <div className="d-flex justify-content-center">
//                 <button className="btn btn-success me-2" onClick={exportToPDF}>
//                     Export to PDF
//                 </button>
//                 <button className="btn btn-primary" onClick={exportToExcel}>
//                     Export to Excel
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default IncomePage;
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
import './Incomepage.css';
import ReactPaginate from 'react-paginate';
import Layout from './Layout'; // Import Layout

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomePage = () => {
    const [incomes, setIncomes] = useState([]);
    const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    // Fetch user ID from localStorage once at the start
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            setFormData((prevData) => ({
                ...prevData,
                user: storedUserId, // Add userId to the formData state
            }));
        } else {
            setError('No user ID found in localStorage');
        }
    }, []); // Empty array ensures this runs only once on mount

    useEffect(() => {
        if (userId) {
            fetchIncomes();
        }
    }, [userId]); // Fetch incomes when userId is available

    const fetchIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/income/');
            const filteredIncomes = response.data.filter((income) => income.user == userId);
            setIncomes(filteredIncomes);
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setError('Failed to load incomes.');
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
                await axios.put(`http://localhost:8000/api/income/${editingId}/`, formData);
                alert('Income updated successfully!');
            } else {
                await axios.post('http://localhost:8000/api/income/', formData);
                alert('Income added successfully!');
            }
            fetchIncomes();
            setFormData({ amount: '', category: '', description: '', date: '', user: userId });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving income:', error);
            setError('Failed to save income.');
        }
    };

    const handleEdit = (income) => {
        setFormData(income);
        setEditingId(income.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/income/${id}/`);
            alert('Income deleted successfully!');
            fetchIncomes();
        } catch (error) {
            console.error('Error deleting income:', error);
            setError('Failed to delete income.');
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(13);
        doc.text('Income Report', 14, 20);
        let y = 30;

        incomes.forEach((income) => {
            doc.text(
                `Amount: ${income.amount} | Category: ${income.category} | Description: ${income.description} | Date: ${income.date}`,
                14,
                y
            );
            y += 10;
        });

        doc.save('income-report.pdf');
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(incomes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');
        XLSX.writeFile(workbook, 'income-report.xlsx');
    };

    const totalIncome = useMemo(() => {
        return incomes.reduce((total, income) => total + Number(income.amount), 0);
    }, [incomes]);

    const chartData = useMemo(
        () => ({
            labels: incomes.map((income) => income.category),
            datasets: [
                {
                    label: 'Income Amounts',
                    data: incomes.map((income) => income.amount),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        }),
        [incomes]
    );

    const currentIncomes = useMemo(() => {
        const offset = currentPage * itemsPerPage;
        return incomes.slice(offset, offset + itemsPerPage);
    }, [incomes, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <Layout>
            <div className="container-fluid py-4">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <Link to="/" className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="h4 text-primary mb-0">Income Management</h1>
                </header>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <div className="row">
                    {/* Form Section */}
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-light">
                            <div className="card-body">
                                <h2 className="h6 text-dark mb-3">Add / Edit Income</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            name="amount"
                                            className="form-control"
                                            placeholder="Enter amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="category"
                                            className="form-control"
                                            placeholder="Enter category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder="Enter description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        {editingId ? 'Update Income' : 'Add Income'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="col-md-8">
                        <div className="card shadow-sm border-light mb-4">
                            <div className="card-body">
                                <h2 className="h6 text-dark mb-3">Income Records</h2>
                                <table className="table table-striped">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Amount</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>User</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentIncomes.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted">
                                                    No income records available. Add a new income to get started.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentIncomes.map((income, index) => (
                                                income.user == userId ? (
                                                    <tr key={income.id}>
                                                        <td>{index + 1 + currentPage * itemsPerPage}</td>
                                                        <td>₱ {income.amount}</td>
                                                        <td>{income.category}</td>
                                                        <td>{income.description}</td>
                                                        <td>{income.date}</td>
                                                        <td>{income.user}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                onClick={() => handleEdit(income)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(income.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ) : null
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                <ReactPaginate
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(incomes.length / itemsPerPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination justify-content-center'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Income */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-sm border-light mb-4">
                            <div className="card-body">
                                <h2 className="h6 text-dark mb-3">Total Income: ₱ {totalIncome}</h2>
                                <Bar data={chartData} options={{ responsive: true }} width={300} height={150} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success me-2" onClick={exportToPDF}>
                        Export to PDF
                    </button>
                    <button className="btn btn-primary" onClick={exportToExcel}>
                        Export to Excel
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default IncomePage;
