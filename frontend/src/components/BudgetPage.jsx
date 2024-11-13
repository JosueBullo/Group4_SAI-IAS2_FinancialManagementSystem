

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Registering necessary components for Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);

// const BudgetPage = () => {
//     const [budgets, setBudgets] = useState([]);
//     const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState(null);

//     // Fetch all budget entries
//     const fetchBudgets = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/budget/');
//             setBudgets(response.data);
//         } catch (error) {
//             console.error('Error fetching budgets:', error);
//         }
//     };

//     useEffect(() => {
//         fetchBudgets();
//     }, []);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewEntry({
//             ...newEntry,
//             [name]: value
//         });
//     };

//     // Handle form submission for adding or updating
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingId) {
//                 // Update existing entry
//                 await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, newEntry, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 alert('Budget entry updated successfully!');
//             } else {
//                 // Create new entry
//                 await axios.post('http://127.0.0.1:8000/api/budget/', newEntry, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 alert('Budget entry saved successfully!');
//             }
//             setNewEntry({ category: '', amount: '', month: '' });
//             setEditingId(null);
//             fetchBudgets();
//         } catch (error) {
//             setError(error.response ? error.response.data : 'An error occurred');
//             console.error('Error saving budget entry:', error.response ? error.response.data : error);
//         }
//     };

//     // Handle deleting a budget entry
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/budget/${id}/`);
//             alert('Budget entry deleted successfully!');
//             fetchBudgets();
//         } catch (error) {
//             console.error('Error deleting budget entry:', error);
//         }
//     };

//     // Handle editing a budget entry
//     const handleEdit = (budget) => {
//         setNewEntry(budget);
//         setEditingId(budget.id);
//     };

//     // Prepare data for the monthly pie chart
//     const prepareChartData = () => {
//         const monthlyData = {};

//         budgets.forEach(budget => {
//             const monthKey = budget.month; // Assuming month is in 'YYYY-MM' format
//             if (!monthlyData[monthKey]) {
//                 monthlyData[monthKey] = {};
//             }
//             if (!monthlyData[monthKey][budget.category]) {
//                 monthlyData[monthKey][budget.category] = 0;
//             }
//             monthlyData[monthKey][budget.category] += budget.amount;
//         });

//         // Prepare labels and datasets for the pie chart
//         const labels = Object.keys(monthlyData).sort(); // Sort months
//         const datasets = [{
//             data: [],
//             backgroundColor: [],
//         }];

//         labels.forEach(month => {
//             const monthData = monthlyData[month];
//             const totalAmount = Object.values(monthData).reduce((a, b) => a + b, 0);
//             datasets[0].data.push(totalAmount);
//             datasets[0].backgroundColor.push(`hsl(${Math.random() * 360}, 70%, 50%)`); // Random colors
//         });

//         return { labels, datasets };
//     };

//     const { labels, datasets } = prepareChartData();

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <h1>Budget Management</h1>
//             {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {JSON.stringify(error)}</div>}
//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Category:</label>
//                     <input
//                         type="text"
//                         name="category"
//                         value={newEntry.category}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Amount:</label>
//                     <input
//                         type="number"
//                         name="amount"
//                         value={newEntry.amount}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Month:</label>
//                     <input
//                         type="month"
//                         name="month"
//                         value={newEntry.month}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ marginRight: '10px' }}>
//                     {editingId ? 'Update Entry' : 'Add Entry'}
//                 </button>
//                 {editingId && (
//                     <button type="button" onClick={() => {
//                         setEditingId(null);
//                         setNewEntry({ category: '', amount: '', month: '' });
//                     }}>
//                         Cancel
//                     </button>
//                 )}
//             </form>

//             <h2>Budget Entries</h2>
//             <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr>
//                         <th>Category</th>
//                         <th>Amount</th>
//                         <th>Month</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {budgets.map((budget) => (
//                         <tr key={budget.id}>
//                             <td>{budget.category}</td>
//                             <td>{budget.amount}</td>
//                             <td>{budget.month}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(budget)}>Edit</button>
//                                 <button onClick={() => handleDelete(budget.id)} style={{ marginLeft: '10px' }}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h2>Monthly Budget Distribution</h2>
//             <Pie data={{
//                 labels: labels,
//                 datasets: datasets,
//             }} />
//         </div>
//     );
// };

// export default BudgetPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Registering necessary components for Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend);

// const BudgetPage = () => {
//     const [budgets, setBudgets] = useState([]);
//     const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState(null);

//     // Fetch all budget entries
//     const fetchBudgets = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/budget/');
//             setBudgets(response.data);
//         } catch (error) {
//             console.error('Error fetching budgets:', error);
//         }
//     };

//     useEffect(() => {
//         fetchBudgets();
//     }, []);

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewEntry({
//             ...newEntry,
//             [name]: value
//         });
//     };

//     // Handle form submission for adding or updating
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Ensure the month is in 'YYYY-MM-DD' format
//             const formattedMonth = newEntry.month ? `${newEntry.month}-01` : '';

//             const updatedEntry = {
//                 ...newEntry,
//                 month: formattedMonth,
//             };

//             if (editingId) {
//                 // Update existing entry
//                 await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, updatedEntry, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 alert('Budget entry updated successfully!');
//             } else {
//                 // Create new entry
//                 await axios.post('http://127.0.0.1:8000/api/budget/', updatedEntry, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 alert('Budget entry saved successfully!');
//             }
//             setNewEntry({ category: '', amount: '', month: '' });
//             setEditingId(null);
//             fetchBudgets();
//         } catch (error) {
//             setError(error.response ? error.response.data : 'An error occurred');
//             console.error('Error saving budget entry:', error.response ? error.response.data : error);
//         }
//     };

//     // Handle deleting a budget entry
//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/budget/${id}/`);
//             alert('Budget entry deleted successfully!');
//             fetchBudgets();
//         } catch (error) {
//             console.error('Error deleting budget entry:', error);
//         }
//     };

//     // Handle editing a budget entry
//     const handleEdit = (budget) => {
//         setNewEntry(budget);
//         setEditingId(budget.id);
//     };

//     // Prepare data for the monthly pie chart
//     const prepareChartData = () => {
//         const monthlyData = {};

//         budgets.forEach(budget => {
//             const monthKey = budget.month; // Assuming month is in 'YYYY-MM-DD' format
//             if (!monthlyData[monthKey]) {
//                 monthlyData[monthKey] = {};
//             }
//             if (!monthlyData[monthKey][budget.category]) {
//                 monthlyData[monthKey][budget.category] = 0;
//             }
//             monthlyData[monthKey][budget.category] += budget.amount;
//         });

//         // Prepare labels and datasets for the pie chart
//         const labels = Object.keys(monthlyData).sort(); // Sort months
//         const datasets = [{
//             data: [],
//             backgroundColor: [],
//         }];

//         labels.forEach(month => {
//             const monthData = monthlyData[month];
//             const totalAmount = Object.values(monthData).reduce((a, b) => a + b, 0);
//             datasets[0].data.push(totalAmount);
//             datasets[0].backgroundColor.push(`hsl(${Math.random() * 360}, 70%, 50%)`); // Random colors
//         });

//         return { labels, datasets };
//     };

//     const { labels, datasets } = prepareChartData();

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//             <h1>Budget Management</h1>
//             {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {JSON.stringify(error)}</div>}
//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Category:</label>
//                     <input
//                         type="text"
//                         name="category"
//                         value={newEntry.category}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Amount:</label>
//                     <input
//                         type="number"
//                         name="amount"
//                         value={newEntry.amount}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Month:</label>
//                     <input
//                         type="month"
//                         name="month"
//                         value={newEntry.month}
//                         onChange={handleChange}
//                         required
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ marginRight: '10px' }}>
//                     {editingId ? 'Update Entry' : 'Add Entry'}
//                 </button>
//                 {editingId && (
//                     <button type="button" onClick={() => {
//                         setEditingId(null);
//                         setNewEntry({ category: '', amount: '', month: '' });
//                     }}>
//                         Cancel
//                     </button>
//                 )}
//             </form>

//             <h2>Budget Entries</h2>
//             <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr>
//                         <th>Category</th>
//                         <th>Amount</th>
//                         <th>Month</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {budgets.map((budget) => (
//                         <tr key={budget.id}>
//                             <td>{budget.category}</td>
//                             <td>{budget.amount}</td>
//                             <td>{budget.month}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(budget)}>Edit</button>
//                                 <button onClick={() => handleDelete(budget.id)} style={{ marginLeft: '10px' }}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h2>Monthly Budget Distribution</h2>
//             <Pie data={{
//                 labels: labels,
//                 datasets: datasets,
//             }} />
//         </div>
//     );
// };

// export default BudgetPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Registering necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigate

    // Fetch all budget entries
    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/budget/');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({
            ...newEntry,
            [name]: value
        });
    };

    // Handle form submission for adding or updating
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedMonth = newEntry.month ? `${newEntry.month}-01` : '';

            const updatedEntry = {
                ...newEntry,
                month: formattedMonth,
            };

            if (editingId) {
                await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, updatedEntry, {
                    headers: { 'Content-Type': 'application/json' }
                });
                alert('Budget entry updated successfully!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/budget/', updatedEntry, {
                    headers: { 'Content-Type': 'application/json' }
                });
                alert('Budget entry saved successfully!');
            }
            setNewEntry({ category: '', amount: '', month: '' });
            setEditingId(null);
            fetchBudgets();
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
            console.error('Error saving budget entry:', error.response ? error.response.data : error);
        }
    };

    // Handle deleting a budget entry
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/budget/${id}/`);
            alert('Budget entry deleted successfully!');
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget entry:', error);
        }
    };

    // Handle editing a budget entry
    const handleEdit = (budget) => {
        setNewEntry(budget);
        setEditingId(budget.id);
    };

    // Prepare data for the monthly pie chart
    const prepareChartData = () => {
        const monthlyData = {};

        budgets.forEach(budget => {
            const monthKey = budget.month;
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {};
            }
            if (!monthlyData[monthKey][budget.category]) {
                monthlyData[monthKey][budget.category] = 0;
            }
            monthlyData[monthKey][budget.category] += budget.amount;
        });

        const labels = Object.keys(monthlyData).sort();
        const datasets = [{
            data: [],
            backgroundColor: [],
        }];

        labels.forEach(month => {
            const monthData = monthlyData[month];
            const totalAmount = Object.values(monthData).reduce((a, b) => a + b, 0);
            datasets[0].data.push(totalAmount);
            datasets[0].backgroundColor.push(`hsl(${Math.random() * 360}, 70%, 60%)`);
        });

        return { labels, datasets };
    };

    const { labels, datasets } = prepareChartData();

    return (
        <div className="container-fluid bg-light min-vh-100">
            <div className="row justify-content-center py-5">
                <div className="col-12 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="display-4 text-primary">Budget Management</h1>
                        <button className="btn btn-secondary" onClick={() => navigate('/    ')}>Back to Dashboard</button>
                    </div>

                    {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}

                    {/* Budget Form */}
                    <div className="card shadow-sm mb-4 border-light">
                        <div className="card-body">
                            <h2 className="h4 mb-4 text-dark">Add or Edit Budget Entry</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label text-muted">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={newEntry.category}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        style={{ borderColor: '#ddd' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label text-muted">Amount</label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={newEntry.amount}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        style={{ borderColor: '#ddd' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="month" className="form-label text-muted">Month</label>
                                    <input
                                        type="month"
                                        id="month"
                                        name="month"
                                        value={newEntry.month}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        style={{ borderColor: '#ddd' }}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">{editingId ? 'Update Entry' : 'Add Entry'}</button>
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId(null);
                                                setNewEntry({ category: '', amount: '', month: '' });
                                            }}
                                            className="btn btn-secondary"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Budget Entries Table */}
                    <div className="card shadow-sm border-light">
                        <div className="card-body">
                            <h2 className="h4 text-center mb-4 text-dark">Budget Entries</h2>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="table-light">
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
                                                        onClick={() => handleEdit(budget)}
                                                        className="btn btn-warning btn-sm me-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(budget.id)}
                                                        className="btn btn-danger btn-sm"
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

                    {/* Pie Chart */}
                    <div className="card shadow-sm mt-4 border-light">
                        <div className="card-body">
                            <h2 className="h4 text-center mb-4 text-dark">Monthly Budget Breakdown</h2>
                            <div className="d-flex justify-content-center">
                                <Pie data={{ labels, datasets }} options={{ responsive: true }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetPage;
