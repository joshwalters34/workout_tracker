const router = require("express").Router();
const Workouts = require("../../models/workout.js");



// router.get('/workouts', (req, res) => {
//     Workouts.find({}, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.json(data)
//     }
//   });
// });

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
  console.log(req.body);

  Workouts.create(req.body).then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

// router.put("/workouts/:id", (req, res) => {
//   Workouts.findByIdAndUpdate({id: req.params.id},
//     {
//       $set: {
//         exercises: req.body
//       }
//     },
//     {new: true, runValidators: true}
//     ).then(data => {
//       res.json(data);
//     }).catch(err => {
//       console.log(err);
//       res.json(err);
//     })
// })

router.put("/workouts/:id", (req, res) => {
  Workouts.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}).then(
        (data) => {
        res.json(data);
      }).catch(err => {
        res.json(err);
      }); 
});

// router.get('/workouts/range', (req, res) => {
//   Workouts.find({}, (error, data) => {
//   if (error) {
//     res.send(error);
//   } else {
//     res.json(data)
//   }
// });
// });

// var query = ModelName.find({}, null, {limit: 10, sort: {'epoch': -1}});
// query.exec(function(err, docs) { ... });

router.get('/workouts/range', (req, res) => {
  Workouts.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration"}
      }
    }
  ])
  .sort({ _id: -1 })
  .limit(7)
  .then(data => res.json(data))
  .catch(err => res.json(err))
  console.log("totalDuration" + totalDuration)
});


module.exports = router;