import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns'; // Import date-fns for formatting dates

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const IncomeChart = ({ incomes = [] }) => {
    const [selectedMonth, setSelectedMonth] = useState('');

    // Helper function to format the month and year of a date as "Month Year" (e.g., "January 2024")
    const formatMonthYear = (date) => {
        return format(new Date(date), 'MMMM yyyy');  // Full month name and year
    };

    // Filter incomes based on the selected month
    const filteredIncomes = useMemo(() => {
        if (!selectedMonth) return incomes;  // If no month selected, show all incomes
        return incomes.filter(income => formatMonthYear(income.date) === selectedMonth);
    }, [incomes, selectedMonth]);

    // Prepare chart data based on filtered incomes
    const chartData = useMemo(() => ({
        labels: filteredIncomes.map(income => `${income.category} (${format(new Date(income.date), 'MMMM yyyy')})`),
        datasets: [{
            label: 'Income Amounts',
            data: filteredIncomes.map(income => income.amount),
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color (optional, for filling under the line)
            tension: 0.4, // Controls the curve of the line
            fill: true, // Fills the area under the line
            borderWidth: 2, // Width of the line
            pointRadius: 5, // Radius of the points on the line (optional)
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the points
            pointBorderColor: 'white', // Border color of the points (optional)
            pointBorderWidth: 2, // Border width of the points (optional)
        }],
    }), [filteredIncomes]);

    // Extract unique month-year combinations for the dropdown and format to "Month Year"
    const monthOptions = useMemo(() => {
        const months = incomes.map(income => formatMonthYear(income.date));
        const uniqueMonths = [...new Set(months)];
        return uniqueMonths;
    }, [incomes]);

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
                            {month} {/* Display the full month name and year */}
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
                            title: { display: true, text: 'Category (Date)' },
                            ticks: {
                                autoSkip: true, // Skips some labels for better spacing
                                maxRotation: 45, // Rotate labels if needed
                                minRotation: 0,
                            },
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

export default IncomeChart;
