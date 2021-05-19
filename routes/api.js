const router = require("express").Router();
const Workouts= require("../models/workout.js");

router.get('/api/workouts', (req, res) => {
    db.Workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data)
    }
  });
});

module.exports = router;