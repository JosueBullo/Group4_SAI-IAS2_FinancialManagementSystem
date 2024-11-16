import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SummaryReport = () => {
    const navigate = useNavigate();
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState({});
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const incomeResponse = await axios.get('http://127.0.0.1:8000/api/income/');
            const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/');
            
            setIncome(incomeResponse.data);
            setExpenses(expensesResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const totalIncomeValue = income.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        const totalExpensesValue = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        setTotalIncome(totalIncomeValue);
        setTotalExpenses(totalExpensesValue);

        const categoryData = expenses.reduce((acc, curr) => {
            const category = curr.category || 'Uncategorized';
            if (!acc[category]) acc[category] = 0;
            acc[category] += parseFloat(curr.amount);
            return acc;
        }, {});
        setExpenseCategories(categoryData);
    }, [income, expenses]);

    const chartData = {
        labels: ['Total Income', 'Total Expenses', 'Remaining Balance'],
        datasets: [
            {
                label: 'Financial Summary',
                data: [totalIncome, totalExpenses, totalIncome - totalExpenses], // Remaining balance calculation
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Total Income
                    'rgba(255, 99, 132, 0.6)', // Total Expenses
                    'rgba(153, 102, 255, 0.6)', // Remaining Balance
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const categoryChartData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expenseCategories),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

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

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet([
            { Description: 'Total Income', Amount: totalIncome.toFixed(2) },
            { Description: 'Total Expenses', Amount: totalExpenses.toFixed(2) },
            { Description: 'Balance', Amount: (totalIncome - totalExpenses).toFixed(2) },
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Summary Report');
        XLSX.writeFile(wb, 'summary-report.xlsx');
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', margin: 'auto', width: '90vw' }} id="summaryReport">
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: '10px' }}>
                <button onClick={() => navigate('/')} style={{ padding: '8px 15px', fontSize: '12px', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
                    Back to Home
                </button>
                <button onClick={exportToPDF} style={{ padding: '8px 12px', fontSize: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}>
                    Export to PDF
                </button>
                <button onClick={exportToExcel} style={{ padding: '8px 12px', fontSize: '12px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Export to Excel
                </button>
            </div>
            
            <h1 style={{ textAlign: 'center', fontSize: '18px', color: '#333', marginBottom: '10px' }}>Summary Report</h1>
            
            <div style={{ fontSize: '14px', marginBottom: '15px', backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '5px' }}>
                <p>Total Income: <strong>${totalIncome.toFixed(2)}</strong></p>
                <p>Total Expenses: <strong>${totalExpenses.toFixed(2)}</strong></p>
                <p style={{ color: totalIncome - totalExpenses < 0 ? 'red' : 'green' }}>Balance: <strong>${(totalIncome - totalExpenses).toFixed(2)}</strong></p>
                <div>
                    <h4>Expense Breakdown by Category:</h4>
                    <ul style={{ listStyleType: 'none', padding: 0, fontSize: '12px' }}>
                        {Object.entries(expenseCategories).map(([category, amount]) => (
                            <li key={category}>
                                {category}: ${amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '15px', margin: '15px 0', color: '#666' }}>Financial Overview</div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '40%' }}>
                    <Pie data={chartData} />
                </div>
                <div style={{ width: '40%' }}>
                    <Bar data={categoryChartData} options={{ maintainAspectRatio: true, responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default SummaryReport;
