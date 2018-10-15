const mongoose = require('mongoose');
const { Workout } = require('./models');

mongoose.connect('mongodb://localhost:27017/wovie');

const getUserWorkout = (userId, workoutId, callback) => {
  Workout.findById(workoutId, (err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

const getUserWorkouts = (userId, callback) => {
  Workout.find({ user_id: userId}, (err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

const addUserWorkout = (userId, workout, callback) => {
  const doc = new Workout({ user_id: userId, activity: workout.activity });
  doc.save((err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

module.exports = { getUserWorkout, getUserWorkouts, addUserWorkout };
