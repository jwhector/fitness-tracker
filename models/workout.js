const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const exerciseSchema = new Schema({
//   name: {
//     type: String,
//     trim: true,
//     required: "Enter a name for exercise"
//   },
//   type: {
//     type: { type: String },
//     required: "Enter exercise category"
//   },
//   weight: {
//     type: Number,
//     required: function() {
//       return this.type !== 'cardio'
//     }
//   },
//   sets: {
//     type: Number,
//     required: function() {
//       return this.type !== 'cardio'
//     }
//   },
//   reps: {
//     type: Number,
//     required: function() {
//       return this.type !== 'cardio'
//     }
//   },
//   duration: {
//     type: Number,
//     required: "Enter exercise duration"
//   },
//   distance: {
//     type: Number,
//     required: function() {
//       return this.type === 'cardio'
//     }
//   },
// });

const workoutSchema = new Schema({
  exercises: [{
    name: {
      type: String,
      trim: true,
      required: "Enter a name for exercise"
    },
    type: {
      type: String,
      required: "Enter exercise category"
    },
    weight: {
      type: Number,
      required: function() {
        return this.type !== 'cardio'
      }
    },
    sets: {
      type: Number,
      required: function() {
        return this.type !== 'cardio'
      }
    },
    reps: {
      type: Number,
      required: function() {
        return this.type !== 'cardio'
      }
    },
    duration: {
      type: Number,
      required: "Enter exercise duration"
    },
    distance: {
      type: Number,
      required: function() {
        return this.type === 'cardio'
      }
    },
  }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
