const fs = require('fs');
const express = require('express');
const fileUplaod = require('express-fileupload');
const EasyFit = require('easy-fit').default;

const db = require('./db/db');

const app = express();
app.use(express.json());
app.use(fileUplaod());
app.use(express.static('public'));

app.post('/workout', (req, res) => {
  const fileData = req.files.workoutFile.data;
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
      db.addWorkout(1, workout, (err, res) => {
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
