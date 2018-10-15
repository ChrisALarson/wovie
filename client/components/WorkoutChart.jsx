import React from 'react';
import {Line} from 'react-chartjs-2';
import simplify from 'simplify-js';

const WorkoutChart = (props) => {
  const { workout } = props;
  console.log(workout);

  const cyclingData = {
    labels: [],
    datasets: [
      {
        label: 'Speed',
        fill: false,
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

  const dataToSimplify = [];
  const cycling = workout.activity.sessions[1];
  const cyclingLaps = cycling.laps;
  // const speedSet = []
  cyclingLaps.forEach(lap => {
    const lapRecords = lap.records;
    lapRecords.forEach(record => {
      dataToSimplify.push({
        x: record.elapsed_time,
        y: record.speed,
      });
      // cyclingData.labels.push(record.elapsed_time);
      // cyclingData.datasets[0].data.push(record.speed);
    });
  });
  const simplified = simplify(dataToSimplify, 4);

  simplified.forEach(simpleRecord => {
    cyclingData.labels.push(simpleRecord.x);
    cyclingData.datasets[0].data.push(simpleRecord.y);
  });

  // console.log(simplified);


  // console.log(cyclingData);
  // labels (time)
  // datasets (HR, speed, cadence, power)

  return (
    <div>
      <h2>Line Example</h2>
      <Line data={cyclingData} />
    </div>
  );
};

export default WorkoutChart;
