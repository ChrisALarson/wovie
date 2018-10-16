import React from 'react';
import WorkoutChartEntry from './WorkoutChartEntry';

const WorkoutChartList = (props) => {
  const { workout } = props;
  const sessions = workout.activity.sessions;
  return (
    <div>
      { 
        sessions.map((session, index) => <WorkoutChartEntry 
          session={session}
          key={index}
        />)
      }
    </div>
  );
};

export default WorkoutChartList;
