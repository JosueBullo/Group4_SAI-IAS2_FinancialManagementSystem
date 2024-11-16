import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetChart = ({ budgets }) => {
    const chartData = useMemo(() => {
        const categoryData = {};
        budgets.forEach(budget => {
            if (!categoryData[budget.category]) {
                categoryData[budget.category] = 0;
            }
            categoryData[budget.category] += parseFloat(budget.amount);
        });

        const labels = Object.keys(categoryData);
        const data = labels.map(label => categoryData[label]);

        return {
            labels,
            datasets: [{
                label: 'Budget Allocation',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        };
    }, [budgets]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: { title: { display: true, text: 'Category' } },
                        y: { title: { display: true, text: 'Amount' }, beginAtZero: true },
                    },
                }}
            />
        </div>
    );
};

export default BudgetChart;
