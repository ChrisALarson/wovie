import React from 'react';
import WorkoutEntry from './WorkoutEntry';

const WorkoutList = (props) => {
  const { workouts } = props;
  return (
    <div>
      { 
        workouts.map(workout => <WorkoutEntry 
          id={workout._id}
          key={workout._id}
          label={workout.label}
          timestamp={workout.timestamp}
        />)
      }
    </div>
  );
};

export default WorkoutList;
