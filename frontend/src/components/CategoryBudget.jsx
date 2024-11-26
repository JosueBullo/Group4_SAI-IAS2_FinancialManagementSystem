import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseBudgetComparisonChart = ({ expenses, budgets }) => {
    console.log("buds", budgets)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // Helper function to format the month and year of a date
    const formatMonthYear = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Filter expenses by selected category and month
    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            const expenseMonth = expense.date ? expense.date.slice(0, 7) : ''; // Get YYYY-MM format
            return (!selectedCategory || expense.category === selectedCategory) &&
                   (!selectedMonth || expenseMonth === selectedMonth);
        });
    }, [expenses, selectedCategory, selectedMonth]);

    // Filter budgets by selected category and month
    const filteredBudgets = useMemo(() => {
        return budgets.filter(budget => {
            const budgetMonth = budget.month ? budget.month.slice(0, 7) : ''; // Get YYYY-MM format
            return (!selectedCategory || budget.category === selectedCategory) &&
                   (!selectedMonth || budgetMonth === selectedMonth);
        });
    }, [budgets, selectedCategory, selectedMonth]);

    // Prepare chart data for the selected category and month
    const chartData = useMemo(() => {
        const expenseData = {};
        const budgetData = {};
        const labels = [];

        // Aggregate expenses and budgets by category and month
        filteredExpenses.forEach(expense => {
            const categoryMonth = `${expense.category} - ${expense.date.slice(0, 7)}`;
            if (!expenseData[categoryMonth]) {
                expenseData[categoryMonth] = 0;
                labels.push(categoryMonth); // Add the label for this category-month combination
            }
            expenseData[categoryMonth] += parseFloat(expense.amount); // Sum up the amounts
        });

        filteredBudgets.forEach(budget => {
            const categoryMonth = `${budget.category} - ${budget.month.slice(0, 7)}`;
            if (!budgetData[categoryMonth]) {
                budgetData[categoryMonth] = 0;
                labels.push(categoryMonth); // Add the label for this category-month combination
            }
            budgetData[categoryMonth] += parseFloat(budget.amount); // Sum up the amounts
        });

        // Remove duplicate labels (only unique combinations should appear)
        const uniqueLabels = [...new Set(labels)];

        // Prepare the data for the chart
        const expenseValues = uniqueLabels.map(label => expenseData[label] || 0);
        const budgetValues = uniqueLabels.map(label => budgetData[label] || 0);

        return {
            labels: uniqueLabels,
            datasets: [
                {
                    label: 'Expenses',
                    data: expenseValues,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    barThickness: 20,
                },
                {
                    label: 'Budgets',
                    data: budgetValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barThickness: 20,
                },
            ],
        };
    }, [filteredExpenses, filteredBudgets]);

    // Extract unique categories for the dropdown
    const categoryOptions = useMemo(() => {
        const categories = [
            ...new Set([ ...expenses.map(expense => expense.category), ...budgets.map(budget => budget.category) ])
        ];
        return categories;
    }, [expenses, budgets]);

    // Extract unique months for the month selector
    const monthOptions = useMemo(() => {
        const months = [
            ...new Set([ ...expenses.map(expense => expense.date ? expense.date.slice(0, 7) : ''), 
                        ...budgets.map(budget => budget.month ? budget.month.slice(0, 7) : '') ])
        ];
        return months;
    }, [expenses, budgets]);

    // Handle category and month selection change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            {/* Category and Month Selector */}
            <div className="text-center mb-3">
                <label htmlFor="categorySelector">Choose Category:</label>
                <select
                    id="categorySelector"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="">All Categories</option>
                    {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <label htmlFor="monthSelector" style={{ marginLeft: '20px' }}>Choose Month:</label>
                <select
                    id="monthSelector"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{ marginLeft: '10px' }}
                >
                    <option value="">All Months</option>
                    {monthOptions.map((month) => (
                        <option key={month} value={month}>
                            {formatMonthYear(month)}
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
                        x: {
                            title: { display: true, text: 'Category - Month' },
                            grid: { display: false },
                        },
                        y: {
                            title: { display: true, text: 'Amount' },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default ExpenseBudgetComparisonChart;
