// Your assignment is to define the routes below. Good luck!
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true,  useFindAndModify: false });

// Find all Workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(function (dbUser) {
    res.json(dbUser);
  }).catch(function (err) {
    res.json(err);
  });
});

//Create Exercice
app.put("/api/workouts/:id",({exercices},res) => {
  db.Workout.update({exercices})
  .then(({ _id }, { $push: { exercices: _id } }, { new: true }))
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})
// 4. Update one note in the database's collection by it's ObjectId
// (remember, mongojs.ObjectId(IdYouWantToFind)
// POST: /api/workouts/:id
// ================================================================
// app.put("/api/workouts/:id", function({body}, res) {
//   db.Workout.update({ name, type, weight, sets, reps, duration ,distance})
//   .then(({_id:id}) => db.Workout.findOneAndUpdate({}, { $push: { exercices: _id } }, { new: true }))
//    .then(function(err, data) {
//       if (err) throw err;
//       res.status(200).json(data);
//     }
//   );
// });


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
