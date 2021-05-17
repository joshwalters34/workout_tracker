const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const Workout = require("./models")

const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

const databaseUrl = "workoutDB";
const collections = ["Workout"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
});
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './views/stats.html'))
});
app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './views/exercise.html'))
});

app.get('/api/workouts', (req, res) => {
  db.Workout.find({}, (error, data) => {
  if (error) {
    res.send(error);
  } else {
    res.json(data)
  }
});

// db.Workout.find({})
// .then(dbWorkout => {
//   res.json(dbWorkout);
// })
// .catch(err => {
//   res.json(err);
// });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});