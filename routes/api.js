const app = require("express").Router();
const Workout = require("../models/model-workout");

app.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id,
        { $push: { exercises: req.body } }, { new: true })
        .then(function (workout) {
            console.log("update the workout", workout);
            res.send(workout)
        })
        .catch(function (err) {
            if (err) throw err
        });
});

app.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.get("/api/workouts/range", function(req, res){
    Workout.find({}).limit(7)
    .then(function(workout){
        console.log("get", workout)
        res.send(workout)
    })
    .catch(function(err){
        if(err)throw err
    });
});



module.exports = app;