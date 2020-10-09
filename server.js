// Your assignment is to define the routes below. Good luck!
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
var path = require('path');
const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true,  useFindAndModify: false,  useUnifiedTopology: true });
// app.get("/exercise", (req, res) => {
//   res.sendFile(path.join(__dirname+'/public/index.html'));
// });
// Find all Workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(function (dbUser) {
    res.json(dbUser);
  }).catch(function (err) {
    res.json(err);
  });
});

//Update Workout

app.put("/api/workouts/:id",(req,res) => {
  const {_id, name, type, weight, duration, reps, sets, distance} = req.body;
  db.Workout.update(
  ({}, { $push: { exercises: { name, type, weight, duration, reps, sets, distance}} }))
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})

// app.post("/api/workouts", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(data => {
//       res.status(201).json(data);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
