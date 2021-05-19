const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/api/apiRoutes")


const PORT = process.env.PORT || 3000;

const app = express();

const databaseUrl = "workoutDB";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});



// app.use('./apiRoutes', apiRoutes)
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", { 
  useNewUrlParser: true,
  useFindAndModify: false
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/publicindex.html'))
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname +'/public/stats.html'))
});

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'))
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});