import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';  // Importing Line chart component
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';  // Register LineElement and PointElement

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);  // Register the necessary chart elements

const ExpenseChart = ({ expenses }) => {
    const [selectedMonth, setSelectedMonth] = useState('');

    // Helper function to format the month and year of a date
    const formatMonthYear = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Filter expenses based on the selected month
    const filteredExpenses = useMemo(() => {
        if (!selectedMonth) return expenses;  // If no month selected, show all expenses
        return expenses.filter(expense => formatMonthYear(expense.date) === selectedMonth);
    }, [expenses, selectedMonth]);

    // Prepare chart data based on filtered expenses
    const chartData = useMemo(() => ({
        labels: filteredExpenses.map(expense => `${expense.category} (${new Date(expense.date).toLocaleDateString()})`),
        datasets: [{
            label: 'Expense Amounts',
            data: filteredExpenses.map(expense => expense.amount),
            borderColor: 'rgba(255, 99, 132, 1)',  // Line color
            backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Fill under the line
            tension: 0.4,  // Smoothing the line
            fill: true,  // Whether the area under the line is filled
            borderWidth: 2,  // Line width
            pointRadius: 5,  // Size of the points
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',  // Point color
            pointBorderColor: 'white',  // Point border color
            pointBorderWidth: 2,  // Point border width
        }],
    }), [filteredExpenses]);

    // Extract unique month-year combinations for the dropdown
    const monthOptions = useMemo(() => {
        const months = expenses.map(expense => formatMonthYear(expense.date));
        const uniqueMonths = [...new Set(months)];
        return uniqueMonths;
    }, [expenses]);

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

            {/* Line Chart */}
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Category (Date)' }
                        },
                        y: {
                            title: { display: true, text: 'Amount' }
                        }
                    }
                }}
            />
        </div>
    );
};

export default ExpenseChart;
