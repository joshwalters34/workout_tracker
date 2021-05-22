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

router.get('/workouts/:id', (req, res) => {
  db.workouts.findByOne({
    _id: mongojs.ObjectID(req.params.id)
  }, (error, data) => {
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

// router.put("/workouts/:id", (req, res) => {
//   db.workouts.findByIdAndUpdate({id: req.params.id},
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
  db.workouts.updateOne({id:req.params.id}, {$push: {exercises: req.body, day:Date.getDay()}},
    console.log(req.body),
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }) 
})

// router.get('/workouts/range', (req, res) => {
//   db.workouts.find({}, (error, data) => {
//   if (error) {
//     res.send(error);
//   } else {
//     res.json(data)
//   }
// });
// });

// router.get('/workouts/range', (req, res) => {
//   db.workouts.aggregate([{ $match: {"date"}},
    
//     {$group: {
//     totalWeight: { $sum: "$weight"},
//     totalDuration: { $sum: "$duration"}
//   }
// }], (error, data) => {
//   if (error) {
//     res.send(error);
//   } else {
//     res.json(data)
//   }
// });
// console.log(totalDuration);
// });


module.exports = router;