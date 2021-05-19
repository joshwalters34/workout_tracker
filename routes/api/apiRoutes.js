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

router.post("/workouts", (req, res) => {
  console.log(req.body);

  db.workouts.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

router.put("/workouts/:id", (req, res) => {
  db.workouts.findByIdAndUpdate(req.params.id,
    {
      $push: {
        exercises: req.body
      }
    },
    {new: true, runValidators: true}
    ).then(data => {
      res.json(data);
    }).catch(err => {
      console.log(err);
      res.json(err);
    })
})

module.exports = router;