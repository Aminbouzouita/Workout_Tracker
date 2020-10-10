const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
 day: [
   {
   type : Date, 
   default: Date.now,
   required: true 
  }
],
  exercises: [
    {
      type: {
        type: String
        
      },
      name: {
        type: String
      },

      duration: {
        type: Number ,
        default: null,
      },
      
      weight: {
        type: Number,
        required: false,
       
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
