const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require('path');
const PORT = process.env.PORT || 3000;
// const Workout = require("./models/resistance.js");
const app = express();

const databaseUrl = "workoutDB";
const collections = ["Workout"];

const db = mongojs(databaseUrl, collections);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

// app.get("/", (req, res) => res.sendFile(path.join(__dirname + "./views/index.html")));
// app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, './public/stats.html')));
// app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, './public/exercise.html')));
// app.get("/api/notes", (req, res) => {
// })
// app.post('/api/notes', (req, res) => {
// });
// app.delete('/api/notes/:id', (req, res) => {
// });
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './views/index.html')));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});