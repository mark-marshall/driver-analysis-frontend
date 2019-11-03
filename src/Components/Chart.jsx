import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

function Chart({ data, req }) {
  // Set chart data and options
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
        label,
        backgroundColor: colors,
        data: [],
      },
    ],
  };
  for (let label in data) {
    chartData['labels'].push(label);
    chartData['datasets'][0]['data'].push(data[label]);
    // set red for positive deltas, and green for negative deltas
    data[label] >= 0
      ? colors.push('rgb(255, 99, 132)')
      : colors.push('rgb(127,232,222)');
  }
  const chartOptions = {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      fontFamily: 'Arial',
      fontStyle: 'none',
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: ylabel,
            fontFamily: 'Arial',
            fontStyle: 'none',
          },
        },
      ],
    },
  };

  return (
    <ChartWrapper>
      <h1>
        {req
          ? `${
              req.year
                ? `${req.year} Season - ${req.target} vs ${
                    req.competitor ? `${req.competitor}` : 'Teammate'
                  } Delta`
                : `Yearly Cumulative - ${req.target} vs ${
                    req.competitor ? `${req.competitor}` : 'Teammate'
                  } Delta`
            }`
          : null}
      </h1>
      {data && req ? <Bar data={chartData} options={chartOptions} /> : null}
    </ChartWrapper>
  );
}

// Styled Components
const ChartWrapper = styled.div`
  padding: 2%;
  h1 {
    font-family: 'Noto Sans', sans-serif;
    padding: 0.2%;
    font-size: 1.1em;
    color: rgb(58,58,60)
  }
`;

export default Chart;
