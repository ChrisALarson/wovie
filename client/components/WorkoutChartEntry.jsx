import React from 'react';
import { Line } from 'react-chartjs-2';
import simplify from 'simplify-js';


const WorkoutChart = (props) => {
  const { session } = props;
  const { sport, laps } = session;

  const cleanseData = (laps) => {
    const rawSpeed = [];
    const rawHR = [];
    const rawPower = [];
    const rawCadence = [];

    laps.forEach(lap => {
      const records = lap.records;
      records.forEach(record => {
        const { elapsed_time, speed, heart_rate, power, cadence } = record;
        if (speed) rawSpeed.push({ x: elapsed_time, y: speed });
        if (heart_rate) rawHR.push({ x: elapsed_time, y: heart_rate });
        if (power) rawPower.push({ x: elapsed_time, y: power });
        if (cadence) rawCadence.push({ x: elapsed_time, y: cadence });
      });
    });
    
    const movingAverage = (data) => {
      let movingAverages = [];
      for (let i = 0; i < data.length - 5; i += 5) {
        let newX = (data[i].x + data[i+1].x + data[i+2].x + data[i+3].x + data[i+4].x) / 5.0;
        let newY = (data[i].y + data[i+1].y + data[i+2].y + data[i+3].y + data[i+4].y) / 5.0;
        movingAverages.push({ x: newX, y: newY });
      }
      return movingAverages;
    }

    const cleansedSpeed = movingAverage(simplify(rawSpeed, 1));
    const cleansedHR = movingAverage(simplify(rawHR, 1));
    const cleansedCadence = movingAverage(simplify(rawCadence, 5));
    const cleansedPower = movingAverage(simplify(rawPower, 5));

    return {
      Speed: cleansedSpeed,
      Heartrate: cleansedHR,
      Cadence: cleansedCadence,
      Power: cleansedPower,
    };
  };

  const generateDataset = (metric, data) => {
    const colorMap = {
      'Heartrate': '#f44336',
      'Power': '#4caf50',
      'Speed': '#2196f3',
      'Cadence': '#9c27b0',
    };
    const positionMap = {
      'Heartrate': 'left',
      'Speed': 'left',
      'Cadence': 'left',
      'Power': 'right',
    };
    const color = colorMap[metric];
    const position = positionMap[metric];

    return {
      label: metric,
      yAxisID: position,
      fill: false,
      showLines: true,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
    };
  };

  const chartData = {
    datasets: [],
  };

  const cleansed = cleanseData(laps);
  const metrics = Object.keys(cleansed);
  metrics.forEach(metric => {
    const data = cleansed[metric];
    if (data.length > 0) chartData.datasets.push(generateDataset(metric, data));
  });

  const chartOpts = {
    scales: {
      xAxes: [
        {
          type: 'linear', 
          position: 'bottom',
          id: 'time'
        }
      ],
      yAxes: [
        {
          type: 'linear',
          position: 'left',
          id: 'left',
        },
        {
          type: 'linear',
          position: 'right',
          id: 'right',
        }
      ]
    },
    elements: { line: { tension: 0 } },
    animation: { duration: 0 },
    hover: { animationDuration: 0 },
    responsiveAnimationDuration: 0,
  };


  return (
    <div>
      <h2>{sport}</h2>
      <Line 
        data={chartData} 
        width={300}
        height={50}
        options={chartOpts}
      />
    </div>
  );
};

export default WorkoutChart;
