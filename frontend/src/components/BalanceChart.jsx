import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BalanceChart = () => {
    const [balanceData, setBalanceData] = useState([]);

    const fetchData = async () => {
        try {
            const incomeResponse = await axios.get('http://127.0.0.1:8000/api/income/');
            const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/');

            const incomeData = incomeResponse.data;
            const expensesData = expensesResponse.data;

            // Process data to get the total balance (income - expenses)
            const totalBalance = processBalanceData(incomeData, expensesData);
            setBalanceData(totalBalance);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const processBalanceData = (income, expenses) => {
        // Calculate total income and total expenses
        const totalIncome = income.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        const totalExpenses = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);

        // Calculate the remaining balance
        const remainingBalance = totalIncome - totalExpenses;

        return [{ balance: remainingBalance }];
    };

    const chartData = {
        labels: ['Balance'], // Single label for the bar
        datasets: [
            {
                label: 'Remaining Balance',
                data: balanceData.map(data => data.balance),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '100%', padding: '20px' }}>
            <h3 style={{ textAlign: 'center' }}>Remaining Balance</h3>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default BalanceChart;
