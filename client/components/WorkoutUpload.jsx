import React from 'react';

const WorkoutUpload = (props) => {
  const { uploadWorkout } = props;
  return (
    <div>
      <form onSubmit={uploadWorkout}>
        <input type="file" name="fit-file"></input>
        <input type="text" name="wo-label" placeholder="Workout name"></input>
        <button>Upload workout</button>
      </form>
    </div>
  );
};

export default WorkoutUpload;