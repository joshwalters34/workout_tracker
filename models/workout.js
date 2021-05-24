const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const resistanceSchema = new Schema(
//     {
//         type: {
//             type: String
//         },
//         name: {
//             type: String
//         },
//         duration: {
//             type: Number
//         },
//         weight: {
//             type: Number
//         },
//         reps: {
//             type: Number
//         },
//         sets: {
//             type: Number
//         },
//     },
// );

// const cardioSchema = new Schema(
//     {
//         type: {
//             type: String
//         },
//         name: {
//             type: String
//         },
//         duration: {
//             type: Number
//         },
//         distance: {
//             type: Number
//         },
//     },
// );
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String
            },
            name: {
                type: String
            },
            duration: {
                type: Number
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
        },
    ],
    
});

const Workouts = mongoose.model("Workouts", WorkoutSchema);
module.exports = Workouts;