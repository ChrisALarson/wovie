import React from 'react';
// import ReactDOM from 'react-dom';

const App = () => {

  const uploadUserWorkout = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData();
    data.append('workoutFile', form['fit-file'].files[0]);

    fetch('/users/1/workouts', {
      method: 'POST',
      body: data,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));

    form.reset();
  };

  return (
    <div>
      <form onSubmit={uploadUserWorkout}>
        <input type="file" name="fit-file"></input>
        <button>Upload workout</button>
      </form>
    </div>
  );  
}
  

export default App;
