import React, { useState, useEffect } from 'react';
import './App.css';
import PieChartComponent from './PieChartComponent';

function App() {
    const [data, setData] = useState([['Transaction', 'Amount']]);
    const API_URL = 'http://127.0.0.1:8000/transactions/'; // replace with your API endpoint

    useEffect(() => {
        fetch(API_URL)                                                                                                                    
            .then(response => response.json())
            .then(data => {
                const expensesData = data.expenses.map(expense => [expense.name, expense.amount]);
                const incomesData = data.incomes.map(income => [income.name, income.amount]);
                setData(prevData => [...prevData, ...expensesData, ...incomesData]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {data.length > 1 ? <PieChartComponent data={data} /> : <p>Loading...</p>}
            </header>
        </div>
    );
}

export default App;
