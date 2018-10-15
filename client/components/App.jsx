import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const uploadWorkout = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData();
    data.append('workoutFile', form['fit-file'].files[0]);

    fetch('/workout', {
      method: 'POST',
      body: data,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

    form.reset();
  };

  return (
    <div>
      <form onSubmit={uploadWorkout}>
        <input type="file" name="fit-file"></input>
        <button>Upload workout</button>
      </form>
    </div>
  );  
}
  

export default App;
