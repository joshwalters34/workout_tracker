const router = require("express").Router();
const {Workouts} = require("../../models/workout.js");
const mongojs = require("mongojs");
const databaseUrl = "workoutDB";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});


router.get('/workouts', (req, res) => {
    db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data)
    }
  });
});

module.exports = router;