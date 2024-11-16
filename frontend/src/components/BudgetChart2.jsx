import React, { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetChart2 = ({ budgets }) => {
    // State to hold the selected month
    const [selectedMonth, setSelectedMonth] = useState('');

    // Helper function to format month and year
    const formatMonthYear = (date) => {
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            console.error('Invalid date:', date); // Log invalid date
            return ''; // Return empty string for invalid dates
        }
        return formattedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Filter the budgets based on the selected month
    const filteredBudgets = useMemo(() => {
        if (!selectedMonth) return budgets; // If no month is selected, show all
        return budgets.filter(budget => formatMonthYear(budget.month) === selectedMonth);
    }, [budgets, selectedMonth]);

    // Prepare chart data
    const chartData = useMemo(() => {
        const categoryData = {};
        filteredBudgets.forEach(budget => {
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
    }, [filteredBudgets]);

    // Extract unique month-year combinations for the dropdown
    const monthOptions = useMemo(() => {
        const months = budgets.map(budget => formatMonthYear(budget.month));
        const uniqueMonths = [...new Set(months)];
        return uniqueMonths;
    }, [budgets]);

    // Handle month selection change
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            {/* Month Selector */}
            <div className="text-center">
                <label htmlFor="monthSelector">Choose Month:</label>
                <select
                    id="monthSelector"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="">All</option>
                    {monthOptions.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Bar Chart */}
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: { title: { display: true, text: 'Category' } },
                        y: { title: { display: true, text: 'Amount' }, beginAtZero: true },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Budget Allocation per Category',
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default BudgetChart2;
