import React from 'react';

import { Bar } from 'react-chartjs-2';

function Chart({ data, req }) {
  const colors = [];
  const chartData = {
    labels: [],
    datasets: [
      {
        title: '',
        label: 'Delta',
        backgroundColor: colors,
        data: [],
      },
    ],
  };
  for (let label in data) {
    chartData['labels'].push(label);
    chartData['datasets'][0]['data'].push(data[label]);
    data[label] >= 0 ? colors.push('rgb(255, 99, 132)') : colors.push('rgb(127,232,222)');
  }

  const chartOptions = {
    title: {
      display: true,
      text: '',
    },
    legend: {
      display: false,
    },
  };
  return data && req ? <Bar data={chartData} options={chartOptions} /> : null;
}

export default Chart;
