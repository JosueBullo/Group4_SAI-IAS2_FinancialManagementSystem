


// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf'; 
// import * as XLSX from 'xlsx';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const IncomePage = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
//     const [editingId, setEditingId] = useState(null);

//     useEffect(() => {
//         fetchIncomes();
//     }, []);

//     const fetchIncomes = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/api/income/');
//             setIncomes(response.data);
//         } catch (error) {
//             console.error('Error fetching incomes:', error);
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
//             } else {
//                 await axios.post('http://localhost:8000/api/income/', formData);
//             }
//             fetchIncomes();
//             setFormData({ amount: '', category: '', description: '', date: '' });
//             setEditingId(null);
//         } catch (error) {
//             console.error('Error saving income:', error);
//         }
//     };

//     const handleEdit = (income) => {
//         setFormData(income);
//         setEditingId(income.id);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/income/${id}/`);
//             fetchIncomes();
//         } catch (error) {
//             console.error('Error deleting income:', error);
//         }
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(18);
//         doc.text('Income Report', 14, 20);
//         let y = 30;

//         incomes.forEach((income) => {
//             doc.text(`Amount: ${income.amount} | Category: ${income.category} | Description: ${income.description} | Date: ${income.date}`, 14, y);
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

//     const chartData = useMemo(() => ({
//         labels: incomes.map(income => income.category),
//         datasets: [{
//             label: 'Income Amounts',
//             data: incomes.map(income => income.amount),
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         }],
//     }), [incomes]);

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <h1>Income Management</h1>
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
//                 <button type="submit">{editingId ? 'Update' : 'Add'} Income</button>
//             </form>

//             <h2>Incomes List</h2>
//             <ul style={{ listStyleType: 'none', padding: '0' }}>
//                 {incomes.map((income) => (
//                     <li key={income.id} style={{ marginBottom: '10px' }}>
//                        ₱ {income.amount} - {income.category} - {income.description} - {income.date}
//                         <button onClick={() => handleEdit(income)} style={{ marginLeft: '10px' }}>Edit</button>
//                         <button onClick={() => handleDelete(income.id)} style={{ marginLeft: '5px' }}>Delete</button>
//                     </li>
//                 ))}
//             </ul>

//             <button onClick={exportToPDF} style={{ marginRight: '10px' }}>Export to PDF</button>
//             <button onClick={exportToExcel}>Export to Excel</button>

//             <h2>Total Income: ₱ {totalIncome.toFixed(2)}</h2>

//             <h2>Income Chart</h2>
//             <div style={{ maxWidth: '600px', margin: 'auto' }}>
//                 <Bar 
//                     data={chartData} 
//                     options={{ 
//                         responsive: true, 
//                         maintainAspectRatio: true,
//                         aspectRatio: 2, // Adjust this value as needed
//                         scales: {
//                             x: {
//                                 title: {
//                                     display: true,
//                                     text: 'Category'
//                                 }
//                             },
//                             y: {
//                                 title: {
//                                     display: true,
//                                     text: 'Amount'
//                                 }
//                             }
//                         }
//                     }} 
//                 />
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomePage = () => {
    const [incomes, setIncomes] = useState([]);
    const [formData, setFormData] = useState({ amount: '', category: '', description: '', date: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/income/');
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
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
            } else {
                await axios.post('http://localhost:8000/api/income/', formData);
            }
            fetchIncomes();
            setFormData({ amount: '', category: '', description: '', date: '' });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving income:', error);
        }
    };

    const handleEdit = (income) => {
        setFormData(income);
        setEditingId(income.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/income/${id}/`);
            fetchIncomes();
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(13);
        doc.text('Income Report', 14, 20);
        let y = 30;

        incomes.forEach((income) => {
            doc.text(`Amount: ${income.amount} | Category: ${income.category} | Description: ${income.description} | Date: ${income.date}`, 14, y);
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

    const chartData = useMemo(() => ({
        labels: incomes.map(income => income.category),
        datasets: [{
            label: 'Income Amounts',
            data: incomes.map(income => income.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    }), [incomes]);

    return (
        <div className="container-fluid dashboard">
            <header className="text-center my-4">
                <h1 className="display-4 text-primary">Income Management</h1>
                <p className="lead text-secondary">Manage and track your income</p>
            </header>

            <div className="row mb-4 justify-content-center">
                <div className="col d-flex justify-content-center gap-3">
                    <Link to="/" className="btn btn-outline-secondary btn-lg">
                        <i className="fas fa-arrow-left me-2"></i> Back to Dashboard
                    </Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="row g-3 mb-4 justify-content-center">
                <div className="col-md-2">
                    <input
                        type="number"
                        name="amount"
                        className="form-control"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary">
                        {editingId ? 'Update Income' : 'Add Income'}
                    </button>
                </div>
            </form>

            <div className="card shadow-lg border-0 mb-4">
                <div className="card-body">
                    <h2 className="card-title text-primary text-center">Incomes List</h2>
                    <ul className="list-group">
                        {incomes.map((income) => (
                            <li key={income.id} className="list-group-item d-flex justify-content-between align-items-center">
                                ₱ {income.amount} - {income.category} - {income.description} - {income.date}
                                <div>
                                    <button onClick={() => handleEdit(income)} className="btn btn-outline-secondary btn-sm me-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(income.id)} className="btn btn-outline-danger btn-sm">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="text-center mb-4">
                <button onClick={exportToPDF} className="btn btn-outline-secondary me-2">
                    Export to PDF
                </button>
                <button onClick={exportToExcel} className="btn btn-outline-secondary">
                    Export to Excel
                </button>
            </div>

            <div className="card shadow-lg border-0">
                <div className="card-body text-center">
                    <h2 className="card-title text-success">Income Chart</h2>
                    <div style={{ maxWidth: '600px', margin: 'auto' }}>
                        <Bar 
                            data={chartData} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: true,
                                aspectRatio: 2,
                                scales: {
                                    x: { title: { display: true, text: 'Category' }},
                                    y: { title: { display: true, text: 'Amount' }}
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <h2 className="text-primary">Total Income: ₱ {totalIncome.toFixed(2)}</h2>
            </div>
        </div>
    );
};

export default IncomePage;


