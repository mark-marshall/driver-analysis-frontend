import React from 'react';
import { Bar } from 'react-chartjs-2';

function Chart({ data, req }) {
  const chartData = {
    labels: [],
    datasets: [
      {
        title: '',
        label: 'Delta',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [],
      },
    ],
  };
  for (let label in data) {
    chartData['labels'].push(label);
    chartData['datasets'][0]['data'].push(data[label]);
  }
  const chartOptions = {
    title: {
      display: true,
      text: '',
    },
    legend: {
      display: false,
    }
  };
  return data && req ? <Bar data={chartData} options={chartOptions} /> : null;
}

export default Chart;
