import React from 'react';

const WorkoutEntry = (props) => {
  const { id, timestamp, label } = props;
  console.log(id);
  return (
    <div>
      <h3>{timestamp}: {label}</h3>
    </div>
  );
};

export default WorkoutEntry;
