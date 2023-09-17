import React from 'react';
import { Chart } from 'react-google-charts';


export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

const PieChartComponent = () => {
    return (
        <div className="pie-chart">
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: 'Expenses',
                    is3D: false,
                }}
            />
            <p>Hello</p>
        </div>
    );
}

export default PieChartComponent;
