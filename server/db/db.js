const mongoose = require('mongoose');
const { User, Workout } = require('./models');

mongoose.connect('mongodb://localhost:27017/wovie');

const getUser = (userId, callback) => {
  User.findOne({ user_id: userId }, (err, data) => {
    if (err) return console.log(err);
    callback(null, data);
  });
};

const getUserWorkout = (userId, workoutId, callback) => {
  Workout.findById(workoutId, (err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

const getUserWorkouts = (userId, callback) => {
  Workout.find({ user_id: userId }, (err, res) => {
    if (err) return console.log(err);
    callback(null, res);
  });
};

// add date, type, and name? to user workout metadata

const addUserWorkout = (userId, workoutData, workoutName, callback) => {
  User
    .findOne({ user_id: userId})
    .exec((err, user) => {
      if (err) return console.log(err);
      const workout = new Workout({ 
        user_id: user.user_id,
        label: workoutName,
        timestamp: workoutData.file_id.time_created,
        activity: workoutData.activity,
      });
      user.workouts.push({
        '_id': workout._id,
        label: workoutName,
        timestamp: workout.timestamp,
      });
      user.numWorkouts = user.workouts.length;
      user.save();
      workout.save((err, res) => {
        if (err) return console.log(err);
        callback(null, res);
      });
    });
};

const addDefaultUser = () => {
  const me = new User({
    user_id: 1,
    numWorkouts: 0,
    workouts: [],
  });
  me.save((err, res) => {
    if (err) return console.log(err);
    console.log(res);
  });
};

addDefaultUser();

module.exports = { getUser, getUserWorkout, getUserWorkouts, addUserWorkout, addDefaultUser };
