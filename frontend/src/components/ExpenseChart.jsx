import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    const chartData = useMemo(() => ({
        labels: expenses.map(expense => expense.category),
        datasets: [{
            label: 'Expense Amounts',
            data: expenses.map(expense => expense.amount),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }],
    }), [expenses]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Bar 
                data={chartData} 
                options={{ responsive: true, maintainAspectRatio: true, scales: { x: { title: { display: true, text: 'Category' } }, y: { title: { display: true, text: 'Amount' } } } }}
            />
        </div>
    );
};

export default ExpenseChart;
