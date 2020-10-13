const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
var path = require('path');
const db = require("./models");
const { type } = require("os");
const { collection } = require("./models/workouts");
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true,  useFindAndModify: false,  useUnifiedTopology: true });

// On click new workout direct page to exercice.html page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname+'/public/exercise.html'));
});

// On click continue workout direct page to stats.html page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname+'/public/stats.html'));
});

// Find all Workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(function (dbWorkout) {
    res.json(dbWorkout);
  }).catch(function (err) {
    res.json(err);
  });
});

//Update Workout
app.put("/api/workouts/:id",(req,res) => {
  const data = req.body;
  db.Workout.findByIdAndUpdate(
  {_id :mongoose.Types.ObjectId(req.params.id)}, { $push: { exercises: data } } ) 
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})

//create new workout 
app.post("/api/workouts", (req, res) => {
const date = Date.now();
const data = req.body;
  db.Workout.create({})
  .then(({_id}) => db.Workout.findOneAndUpdate({_id}, { $push: {day: date, exercises: data  } }))
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// find workout by range
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(function (dbWorkout) {
      res.json(dbWorkout);
    }).catch(function (err) {
      res.json(err);
    });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
