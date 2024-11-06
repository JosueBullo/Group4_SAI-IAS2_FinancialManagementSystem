// src/components/TotalChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalChart = ({ totalIncome, totalExpense }) => {
    const chartData = {
        labels: ['Total Income', 'Total Expense'],
        datasets: [{
            label: 'Amount',
            data: [totalIncome, totalExpense],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        }],
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Bar 
                data={chartData} 
                options={{ 
                    responsive: true, 
                    maintainAspectRatio: true,
                    aspectRatio: 2,
                    scales: {
                        x: { title: { display: true, text: 'Category' } },
                        y: { title: { display: true, text: 'Amount' } }
                    }
                }} 
            />
        </div>
    );
};

export default TotalChart;
