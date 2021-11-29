const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require('path');
const mongoose = require("mongoose");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      // dbWorkout.aggregate([
      //   {
      //     $addfields: { 
      //       totalDuration: { $sum: "$exercises.duration" }
      //     }
      //   }
      // ])
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  // Workout.find({ id: req.params.id })
  //   .then(dbWorkout => {
  console.log(req.body);
  Workout.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) },
    { $push: { exercises: req.body } }).then(() => {
      Workout.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
        },
        {
          $addFields: { 
            totalDuration: { $sum: "$exercises.duration" }
          }
        }
      ]).then(dbArr => {
        const dbWorkout = dbArr[0];
        console.log(dbWorkout);
        // dbWorkout.exercises.push(req.body);
        res.json(dbWorkout);
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});



// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: { 
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ]).then(dbArr => {
    const dbWorkout = dbArr;
    // console.log(dbWorkout);
    // dbWorkout.exercises.push(req.body);
    res.json(dbArr);
  }).catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;
