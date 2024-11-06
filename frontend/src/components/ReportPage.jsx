
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const SummaryReport = () => {
//     const [income, setIncome] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [budgets, setBudgets] = useState([]);
//     const [totalIncome, setTotalIncome] = useState(0);
//     const [totalExpenses, setTotalExpenses] = useState(0);
//     const [totalBudget, setTotalBudget] = useState(0);

//     const fetchData = async () => {
//         try {
//             const incomeResponse = await axios.get('http://127.0.0.1:8000/api/income/');
//             const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/');
//             const budgetsResponse = await axios.get('http://127.0.0.1:8000/api/budget/');
            
//             setIncome(incomeResponse.data);
//             setExpenses(expensesResponse.data);
//             setBudgets(budgetsResponse.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const totalIncomeValue = income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//         const totalExpensesValue = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//         const totalBudgetValue = budgets.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

//         setTotalIncome(totalIncomeValue);
//         setTotalExpenses(totalExpensesValue);
//         setTotalBudget(totalBudgetValue);
//     }, [income, expenses, budgets]);

//     const chartData = {
//         labels: ['Total Income', 'Total Expenses', 'Total Budget'],
//         datasets: [
//             {
//                 label: 'Financial Summary',
//                 data: [totalIncome, totalExpenses, totalBudget],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.6)',
//                     'rgba(255, 99, 132, 0.6)',
//                     'rgba(255, 206, 86, 0.6)',
//                 ],
//                 borderColor: [
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(255, 206, 86, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     // Function to export the summary to PDF
//     const exportToPDF = () => {
//         const pdf = new jsPDF();
//         const input = document.getElementById('summaryReport');

//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const imgWidth = 190;
//             const pageHeight = pdf.internal.pageSize.height;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;
//             let heightLeft = imgHeight;

//             let position = 10;

//             pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;

//             while (heightLeft >= 0) {
//                 position = heightLeft - imgHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//                 heightLeft -= pageHeight;
//             }

//             pdf.save('summary-report.pdf');
//         });
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }} id="summaryReport">
//             <h1>Summary Report</h1>
//             <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
//             <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
//             <h2>Total Budget: ${totalBudget.toFixed(2)}</h2>
//             <h2>Balance: ${(totalIncome - totalExpenses).toFixed(2)}</h2>

//             {/* Pie Chart */}
//             <h2>Financial Overview</h2>
//             <Pie data={chartData} />

//             <button onClick={exportToPDF} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
//                 Export to PDF
//             </button>
//         </div>
//     );
// };

// export default SummaryReport;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryReport = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);

    const fetchData = async () => {
        try {
            const incomeResponse = await axios.get('http://127.0.0.1:8000/api/income/');
            const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/');
            const budgetsResponse = await axios.get('http://127.0.0.1:8000/api/budget/');
            
            setIncome(incomeResponse.data);
            setExpenses(expensesResponse.data);
            setBudgets(budgetsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const totalIncomeValue = income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const totalExpensesValue = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const totalBudgetValue = budgets.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        setTotalIncome(totalIncomeValue);
        setTotalExpenses(totalExpensesValue);
        setTotalBudget(totalBudgetValue);
    }, [income, expenses, budgets]);

    const chartData = {
        labels: ['Total Income', 'Total Expenses', 'Total Budget'],
        datasets: [
            {
                label: 'Financial Summary',
                data: [totalIncome, totalExpenses, totalBudget],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Function to export the summary to PDF
    const exportToPDF = () => {
        const pdf = new jsPDF();
        const input = document.getElementById('summaryReport');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 10;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('summary-report.pdf');
        });
    };

    // Function to export data to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet([
            { Description: 'Total Income', Amount: totalIncome.toFixed(2) },
            { Description: 'Total Expenses', Amount: totalExpenses.toFixed(2) },
            { Description: 'Total Budget', Amount: totalBudget.toFixed(2) },
            { Description: 'Balance', Amount: (totalIncome - totalExpenses).toFixed(2) },
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Summary Report');
        XLSX.writeFile(wb, 'summary-report.xlsx');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }} id="summaryReport">
            <h1>Summary Report</h1>
            <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
            <h2>Total Budget: ${totalBudget.toFixed(2)}</h2>
            <h2>Balance: ${(totalIncome - totalExpenses).toFixed(2)}</h2>

            {/* Pie Chart */}
            <h2>Financial Overview</h2>
            <Pie data={chartData} />

            <button onClick={exportToPDF} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                Export to PDF
            </button>
            <button onClick={exportToExcel} style={{ marginTop: '20px', marginLeft: '10px', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                Export to Excel
            </button>
        </div>
    );
};

export default SummaryReport;
