const router = require("express").Router();
const Workouts = require("../../models/workout.js");




router.get('/workouts/range', (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration"}
      }
    },
  ])
  .sort({ _id: -1 })
  .limit(7)
  .then(data => {
    console.log("--------------")
    console.log(data);
    return res.json(data);
  })
  .catch(err => res.json(err));
  
});

router.get("/workouts", (req, res) => {
  Workouts.find({})
  .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/workouts/:id', (req, res) => {
  Workouts.find(req.params.id)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  });
});

router.post("/workouts", (req, res) => {
  console.log("----------------");
  console.log(req.body);

  Workouts.create(req.body).then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});



router.put("/workouts/:id", (req, res) => {
  Workouts.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}).then(
        (data) => {
        res.json(data);
      }).catch(err => {
        res.json(err);
      }); 
});







module.exports = router;