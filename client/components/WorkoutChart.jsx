import React from 'react';
import { Scatter, Line } from 'react-chartjs-2';
import simplify from 'simplify-js';

// create a chart for each activity
// For each activity, create chart set
  // char set includes: speed (if exists), HR (if exists), power (if exists), cadence (if exists)
  // pick color for speed, HR, cadence, power

const WorkoutChart = (props) => {
  const { workout } = props;
  console.log(workout);

  const cyclingData = {
    datasets: [
      {
        label: 'HR',
        fill: false,
        showLines: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      },
      {
        label: 'Speed',
        fill: false,
        showLines: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ],
  }

  //  cycling: speed, heartrate, power, cadence
  const rawSpeed = [];
  const rawHR = [];
  const rawPower = [];
  const rawCadence = [];

  const cycling = workout.activity.sessions[1];
  const cyclingLaps = cycling.laps;
  // const speedSet = []
  cyclingLaps.forEach(lap => {
    const lapRecords = lap.records;
    lapRecords.forEach(record => {
      if (record.speed) {
        rawSpeed.push({
          x: record.elapsed_time,
          y: record.speed,
        });
      }
      if (record.heart_rate) {
          rawHR.push({
          x: record.elapsed_time,
          y: record.heart_rate,
        });
      }
      if (record.power) {
        rawPower.push({
          x: record.elapsed_time,
          y: record.power,
        });
      }
      if (record.cadence) {
        rawCadence.push({
          x: record.elapsed_time,
          y: record.cadence,
        });
      }
    });
  });
  console.log('speed: ', rawSpeed);
  console.log('cadence: ', rawCadence);
  console.log('power: ', rawPower);
  console.log('hr: ', rawHR);
  const simplifiedSpeed = simplify(rawSpeed, 1);
  const simplifiedHR = simplify(rawHR, 1);

  simplifiedHR.forEach(simpleRecord => {
    cyclingData.datasets[0].data.push(simpleRecord);
  });

  simplifiedSpeed.forEach(simpleRecord => {
    cyclingData.datasets[1].data.push(simpleRecord);
  });

  // console.log(simplified);


  // console.log(cyclingData);
  // labels (time)
  // datasets (HR, speed, cadence, power)
  const options = {
    scales: {
      xAxes: [{
        type: 'linear', // scatter should not use a category axis
        position: 'bottom',
        id: 'x-axis-1' // need an ID so datasets can reference the scale
      }],
      yAxes: [{
        type: 'linear',
        position: 'left',
        id: 'y-axis-1'
      }]
    },
    maintainAspectRatio: false,
  };


  return (
    <div>
      <h2>Line Example</h2>
      <Line 
        data={cyclingData} 
        width={300}
        height={150}
        options={options}
      />
    </div>
  );
};

export default WorkoutChart;

// options={{
//   maintainAspectRatio: false
// }}
