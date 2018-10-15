const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  timestamp: Date,
  elapsed_time: Number,
  distance: Number,
  speed: Number,
  power: Number,
  cadence: Number,
  temperature: Number,
  heart_rate: Number,
}, {
  _id: false,
  id: false,
});

const lapSchema = new Schema({
  records: [ recordSchema ],
}, {
  _id: false,
  id: false,
});

const sessionSchema = new Schema({
  sport: String,
  laps: [ lapSchema ],
}, {
  _id: false,
  id: false,
});

const activitySchema = new Schema({
  timestamp: Date,
  total_timer_time: Number,
  num_sessions: Number,
  sessions: [ sessionSchema ],
}, {
  _id: false,
  id: false,
});

const workoutSchema = new Schema({
  user_id: Number,
  activity: activitySchema,
});

workoutSchema.index({ user_id: 1 });

const userSchema = new Schema({
  user_id: Number,
});

const Workout = mongoose.model('Workout', workoutSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Workout };
