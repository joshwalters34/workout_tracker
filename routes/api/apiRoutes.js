const router = require("express").Router();
const {Workouts} = require("../../models/workout.js");

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