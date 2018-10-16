import React from 'react';
import WorkoutUpload from './WorkoutUpload';
import WorkoutList from './WorkoutList';
import WorkoutChartList from './WorkoutChartList';

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
    this.getWorkout = this.getWorkout.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.getUser(this.state.userId);
  }

  goHome() {
    this.setState({
      activeWorkout: null,
    });
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

  getWorkout(workoutId) {
    fetch(`/users/${this.state.userId}/workouts/${workoutId}`)
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
    fetch(`/users/${this.state.userId}/workouts`, {
      method: 'POST',
      body: data,
    })
    .then(res => this.getUser(this.state.userId))
    .catch(err => console.log(err));
    form.reset();
  }

  render() {
    return (
      <div>
        <WorkoutUpload uploadWorkout={this.uploadWorkout} />
        <button onClick={this.goHome}>HOME</button>
        {
          this.state.activeWorkout ? 
            <WorkoutChartList workout={this.state.activeWorkout} /> :
            <WorkoutList workouts={this.state.workouts} getWorkout={this.getWorkout} />
        }
      </div>
    );  
  }
}

export default App;
