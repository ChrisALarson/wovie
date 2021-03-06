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
  altitude: Number,
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
  avg_speed: Number,
  avg_cadence: Number,
  avg_power: Number,
  avg_heart_rate: Number,
  total_calories: Number,
  total_distance: Number,
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
  user_id: {
    type: Number,
    ref: 'User',
  },
  timestamp: Date,
  label: String,
  activity: activitySchema,
});

workoutSchema.index({ user_id: 1 });
const Workout = mongoose.model('Workout', workoutSchema);

const userSchema = new Schema({
  user_id: Number,
  numWorkouts: Number,
  workouts: [
    {
      '_id': { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
      label: String,
      timestamp: Date,
    }
  ],
});

userSchema.index({ user_id: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = { User, Workout };
