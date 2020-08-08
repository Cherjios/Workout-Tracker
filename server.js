const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
var path = require("path");

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

  app.get("/", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
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
 
  app.post("/api/workouts", ({body}, res) => {
    //continue here
    db.Workout.create(body)
      .then(dbWorkout =>{
        res.json(body);
      })
      .catch(err =>{
        res.json(err);
      });
  });

  app.post("/exercise", ({body}, res) => {
    db.Book.create(body)
      
  });



//   app.get("/api/workouts/id", (req, res) => {
//     db.Workout.find({})
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

//   app.get("/api/workouts/range", (req, res) => {
//     db.Workout.find({})
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

//   app.get("/user", (req, res) => {
//     db.User.find({})
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

//   app.get("/user", (req, res) => {
//     db.Workout.find({})
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });
  
  

//   app.post("/exercise", ({ body }, res) => {
//     db.Workout.create(body)
//       .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });


  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });


  