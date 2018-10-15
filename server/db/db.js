const mongoose = require('mongoose');
const { Workout } = require('./models');

mongoose.connect('mongodb://localhost:27017/wovie');

const addWorkout = (userId, workout, callback) => {
  const woDoc = new Workout({ user_id: userId, activity: workout.activity });
  woDoc.save((err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

module.exports = { addWorkout };
