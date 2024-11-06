// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

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

//     // Prepare data for the pie chart
//     const chartData = {
//         labels: budgets.map(b => b.category),
//         datasets: [{
//             data: budgets.map(b => b.amount),
//             backgroundColor: budgets.map((b, index) => `hsl(${(index * 360) / budgets.length}, 70%, 50%)`),
//         }],
//     };

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

//             <h2>Budget Distribution</h2>
//             <Pie data={chartData} />
//         </div>
//     );
// };

// export default BudgetPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [newEntry, setNewEntry] = useState({ category: '', amount: '', month: '' });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

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
            if (editingId) {
                // Update existing entry
                await axios.put(`http://127.0.0.1:8000/api/budget/${editingId}/`, newEntry, {
                    headers: { 'Content-Type': 'application/json' }
                });
                alert('Budget entry updated successfully!');
            } else {
                // Create new entry
                await axios.post('http://127.0.0.1:8000/api/budget/', newEntry, {
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
            const monthKey = budget.month; // Assuming month is in 'YYYY-MM' format
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {};
            }
            if (!monthlyData[monthKey][budget.category]) {
                monthlyData[monthKey][budget.category] = 0;
            }
            monthlyData[monthKey][budget.category] += budget.amount;
        });

        // Prepare labels and datasets for the pie chart
        const labels = Object.keys(monthlyData).sort(); // Sort months
        const datasets = [{
            data: [],
            backgroundColor: [],
        }];

        labels.forEach(month => {
            const monthData = monthlyData[month];
            const totalAmount = Object.values(monthData).reduce((a, b) => a + b, 0);
            datasets[0].data.push(totalAmount);
            datasets[0].backgroundColor.push(`hsl(${Math.random() * 360}, 70%, 50%)`); // Random colors
        });

        return { labels, datasets };
    };

    const { labels, datasets } = prepareChartData();

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Budget Management</h1>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {JSON.stringify(error)}</div>}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={newEntry.category}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={newEntry.amount}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Month:</label>
                    <input
                        type="month"
                        name="month"
                        value={newEntry.month}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <button type="submit" style={{ marginRight: '10px' }}>
                    {editingId ? 'Update Entry' : 'Add Entry'}
                </button>
                {editingId && (
                    <button type="button" onClick={() => {
                        setEditingId(null);
                        setNewEntry({ category: '', amount: '', month: '' });
                    }}>
                        Cancel
                    </button>
                )}
            </form>

            <h2>Budget Entries</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                <button onClick={() => handleEdit(budget)}>Edit</button>
                                <button onClick={() => handleDelete(budget.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Monthly Budget Distribution</h2>
            <Pie data={{
                labels: labels,
                datasets: datasets,
            }} />
        </div>
    );
};

export default BudgetPage;
