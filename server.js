const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Workout  = require("./models");


const PORT = process.env.PORT || 3000;
var path = require("path");


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

  
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


  app.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
      .then(dbWorkout =>{
        res.json(dbWorkout);
      })
      .catch(err =>{
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, 
      {$push: { exercises: req.body} },{new: true})
      .then(dbWorkout => {
        res.send(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
 
    app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.send(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });


  