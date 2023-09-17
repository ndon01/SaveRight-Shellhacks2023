import React from 'react';
import { Chart } from 'react-google-charts';


export const data = [
    ["Type", "Net"],
    ["Income", 11],
    ["Expenses", 2],
  ];
  

const PieChartComponent = ({chartName,data}) => {
    return (
        <div className="pie-chart">
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: chartName,
                    is3D: false,
                }}
            />
            <p>Hello</p>
        </div>
    );
}

export default PieChartComponent;
