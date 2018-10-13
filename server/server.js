const express = require('express');
const EasyFit = require('easy-fit').default;
const fs = require('fs');

const app = express();
app.use(express.static('public'));


let basic_file = './sample-data/raw/garmin-basic.fit';
let multi_file = './sample-data/raw/garmin-multi-sport.fit';
let multi_hr_file = './sample-data/raw/garmin-multi-sport-hr.fit';

fs.readFile(multi_file, function (err, content) {
  var easyFit = new EasyFit({
    force: true,
    speedUnit: 'mph',
    lengthUnit: 'mi',
    temperatureUnit: 'farhenheit',
    elapsedRecordField: true,
    mode: 'cascade',
  });
  
  easyFit.parse(content, function (error, data) {
    if (error) {
      console.log(error);
    } else {
      let sessions = data.activity.sessions;
      sessions.forEach(session => {
        console.log(session.sport);
        let laps = session.laps;
        console.log('Number of laps: ', laps.length);
        laps.forEach(lap => {
          let records = lap.records;
          console.log('Number of lap records: ', records.length);
        })
      });
      // fs.writeFileSync('./helloworld.json', JSON.stringify(data, null, 2));
      // fs.writeFile('./basic.json', JSON.stringify(data, null, 2), (err, res) => {
      //   if (err) console.log(err);
      //   console.log(res);
      // });
      // console.log(JSON.stringify(data, null, 2));
    }
  });
});

app.listen(3002, () => console.log('App listening on port 3000'));
