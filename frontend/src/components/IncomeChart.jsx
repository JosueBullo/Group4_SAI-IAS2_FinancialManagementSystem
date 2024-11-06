import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ incomes }) => {
    const chartData = useMemo(() => ({
        labels: incomes.map(income => income.category),
        datasets: [{
            label: 'Income Amounts',
            data: incomes.map(income => income.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    }), [incomes]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Bar 
                data={chartData} 
                options={{ responsive: true, maintainAspectRatio: true, scales: { x: { title: { display: true, text: 'Category' } }, y: { title: { display: true, text: 'Amount' } } } }}
            />
        </div>
    );
};

export default IncomeChart;
