const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  distance: {
    type: Number
  },
  duration: {
    type: Number
  },
  cardio_name: {
    type: String
  },
  weight: {
    type: Number
  },
  sets: {
    type: Number
  },
  reps: {
    type: Number
  },
  resistance_duration: {
    type: Number
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
