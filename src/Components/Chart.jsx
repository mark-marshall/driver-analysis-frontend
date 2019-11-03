import React from 'react';
import { Bar } from 'react-chartjs-2';

function Chart({ data, req }) {
  const title = `${
    req.year
      ? `${req.year} Season - ${req.target} vs ${
          req.competitor ? `${req.competitor}` : 'Teammate'
        } Delta`
      : `Yearly Cumulative - ${req.target} vs ${
          req.competitor ? `${req.competitor}` : 'Teammate'
        } Delta`
  }`;
  const label = `${req.target} Delta to ${req.competitor || 'Teammate'}`;
  const ylabel = `${
    req.year
      ? `Laptime Delta [s] (Positive = ${req.target} Slower)`
      : `Cumulative Laptime Delta [s] (Positive = ${req.target} Slower)`
  }`;
  const colors = [];
  const chartData = {
    labels: [],
    datasets: [
      {
        title,
        label,
        backgroundColor: colors,
        data: [],
      },
    ],
  };
  for (let label in data) {
    chartData['labels'].push(label);
    chartData['datasets'][0]['data'].push(data[label]);
    data[label] >= 0
      ? colors.push('rgb(255, 99, 132)')
      : colors.push('rgb(127,232,222)');
  }
  const chartOptions = {
    title: {
      display: true,
      text: title,
    },
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      color: 'green',
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: ylabel,
          },
        },
      ],
    },
  };

  return data && req ? <Bar data={chartData} options={chartOptions} /> : null;
}

export default Chart;
