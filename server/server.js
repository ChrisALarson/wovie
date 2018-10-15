const express = require('express');
const fileUpload = require('express-fileupload');
const EasyFit = require('easy-fit').default;
const db = require('./db/db');

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));


// get user
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  db.getUser(userId, (err, data) => {
    if (err) return console.log(err);
    res.status(200).send(data);
  });
});

// get user workout
app.get('/users/:userId/workouts/:workoutId', (req, res) => {
  const { userId, workoutId } = req.params;
  db.getUserWorkout(userId, workoutId, (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

// get user workouts
app.get('/users/:userId/workouts', (req, res) => {
  const { userId } = req.params;
  db.getWorkouts(userId, (err, data) => {
    if (err) return console.log(err);
    res.send(data);
  });
});

// add user workout
app.post('/users/:userId/workouts', (req, res) => {
  const { userId } = req.params;
  const fileData = req.files.workoutFile.data;
  const workoutName = req.body.workoutName;
  console.log(workoutName);
  const easyFit = new EasyFit({
    force: true,
    speedUnit: 'mph',
    lengthUnit: 'mi',
    temperatureUnit: 'farhenheit',
    elapsedRecordField: true,
    mode: 'cascade',
  });
  easyFit.parse(fileData, function (error, workout) {
    if (error) {
      res.status(500).send('Unable to parse workout. Check file type and try again.');
      console.log(error);
    } else {
      db.addUserWorkout(userId, workout, workoutName, (err, res) => {
        console.log(res);
      });
      let sessions = workout.activity.sessions;
      sessions.forEach(session => {
        console.log(session.sport);
        let laps = session.laps;
        console.log('Number of laps: ', laps.length);
        laps.forEach(lap => {
          let records = lap.records;
          console.log('Number of lap records: ', records.length);
        })
      });
      res.status(201).send('Workout posted!');
    }
  });
});


app.listen(3002, () => console.log('App listening on port 3002'));
