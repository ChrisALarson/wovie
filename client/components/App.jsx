import React from 'react';
import WorkoutEntry from './WorkoutEntry';
import WorkoutChart from './WorkoutChart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      numWorkouts: 0,
      workouts: [],
      activeWorkout: null,
    };
    this.uploadWorkout = this.uploadWorkout.bind(this);
  }

  componentDidMount() {
    this.getUser(this.state.userId);
    this.getWorkout(this.state.userId, '5bc500c12691700df317debd');
  }

  getUser(userId) {
    fetch(`/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          numWorkouts: data.numWorkouts,
          workouts: data.workouts,
        });
      })
      .catch(e => console.log(e));
  }

  getWorkout(userId, workoutId) {
    fetch(`/users/${userId}/workouts/${workoutId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          activeWorkout: data,
        });
      })
      .catch(e => console.log(e));
  }
  
  uploadWorkout(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData();
    data.append('workoutFile', form['fit-file'].files[0]);
    data.append('workoutName', form['wo-label'].value);
    fetch('/users/1/workouts', {
      method: 'POST',
      body: data,
    })
    .then(res => this.getUser(this.state.userId))
    .catch(err => console.log(err));
    form.reset();
  }

  renderRecentWorkouts() {
    return (
      <div>
        { this.state.workouts.map(workout => <WorkoutEntry key= {workout._id} id={workout._id} label={workout.label} timestamp={workout.timestamp} />) }
      </div>
    );
  }

  renderWorkoutChart() {
    if (this.state.activeWorkout !== null) {
      return <WorkoutChart workout={this.state.activeWorkout}/>;
    } else {
      return <div>No active workout</div>;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.uploadWorkout}>
          <input type="file" name="fit-file"></input>
          <input type="text" name="wo-label" placeholder="Workout name"></input>
          <button>Upload workout</button>
        </form>
        <div>
          <h2>Recent workouts:</h2>
          { this.renderRecentWorkouts() }
        </div>
        { this.renderWorkoutChart() }
      </div>
    );  
  }
}

export default App;
