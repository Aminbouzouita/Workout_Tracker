const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
 day: [
   {
   type : Date, 
   default: Date.now 
  }
],
  exercises: [
    {
      type: {
        type: String,
        
      },
      name: {
        type: 
      },
      duration: {
        type: Number
      },
      
      weight: {
        type: Number,
        required: false,
        default: null,
      },
      reps: {
        type: Number,
        required: false,
        default: null,
      },
      sets: {
        type: Number,
        required: false,
        default: null,
      },
      distance: {
        type: Number,
        required: false,
        default: null,
      }
    }]
    
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
