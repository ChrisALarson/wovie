const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  timestamp: Date,
  elapsed_time: Number,
  distance: Number,
  speed: Number,
});

const lapSchema = new Schema({
  records: [ recordSchema ],
});

const sessionSchema = new Schema({
  sport: String,
  laps: [ lapSchema ],
});

const activitySchema = new Schema({
  timestamp: Date,
  total_timer_time: Number,
  num_sessions: Number,
  sessions: [ sessionSchema ],
});

const workoutSchema = new Schema({
  user_id: Number,
  activity: activitySchema,
});

const userSchema = new Schema({
  user_id: Number,
});

const Workout = mongoose.model('Workout', workoutSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Workout };
