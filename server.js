// Your assignment is to define the routes below. Good luck!
const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const databaseUrl = "workout";
const collections = ["exercices"];
const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});

// Find all exercises
app.get("/api/workouts", (req, res) => {
  db.exercise.find({}, (error, found) => {
    if (error) throw error;
    res.status(200).json(found);
  });
});
