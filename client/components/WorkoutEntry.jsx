import React from 'react';
import moment from 'moment';

const WorkoutEntry = (props) => {
  const { workout, getWorkout } = props;
  const { _id, timestamp, label } = workout;
  const formatted = moment(timestamp).format('LLLL'); // Tuesday, October 16, 2018 10:22 AM
  const handleClick = () => {
    getWorkout(_id);
  };
  return (
    <div onClick={handleClick}>
      <h3>{formatted}: {label}</h3>
    </div>
  );
};

export default WorkoutEntry;
