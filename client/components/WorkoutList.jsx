import React from 'react';
import WorkoutEntry from './WorkoutEntry';

const WorkoutList = (props) => {
  const { workouts, getWorkout } = props;
  return (
    <div>
      { 
        workouts.map(workout => <WorkoutEntry 
          key={workout._id}
          workout={workout}
          getWorkout={getWorkout}
        />)
      }
    </div>
  );
};

export default WorkoutList;
