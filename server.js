const express = require("express");
const path = require("path")
const mongojs = require("mongojs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let mongoose = require("mongoose")

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workoutdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// const databaseUrl = "workout";
// const collections = ["exercises"];
// const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {

    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

app.get("/api/workouts", (req, res) => {
    db.exercise.aggregate([   
        {
           $addFields: {
               "totalDuration": {
                   $sum: "$exercises.duration"
               }
           }
        }], 
        (err, data) => {
            if (err) {
                console.log(data)
                res.send(err)
            } else {
                console.log(data)
                res.send(data)
            }
        }
    );
})

app.put("/api/workouts/:id", (req, res) => {

// Get the current date
    let day = new Date().setDate(new Date().getDate() - 9)

    // Check the type of exercise

    
    if(req.body.type === "cardio") { // Cardio exercises
        db.exercise.update(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {
                $set: { day: day },
                $push: {
                    exercises: {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        distance: req.body.duration,
                    }
                }
            }
        )
    }

    if (req.body.type === "resistance") { // resistance exercise
        db.exercise.update(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {
                $set: { day: day },
                $push: {
                    exercises: {
                        type: req.body.type,
                        name: req.body.name,
                        weight: req.body.weight,
                        sets: req.body.sets,
                        reps: req.body.reps,
                        duration: req.body.duration
                    }
                },
            },
            (err, data) => {
                if (err) {
                    console.log(data)
                    res.send(err)
                } else {
                    console.log(data)
                    res.send(data)
                }
            }
        )
    } 
})

app.post("/api/workouts", (req, res) => {
    db.exercise.insert(req.body, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.exercise.aggregate([   
        {
           $addFields: {
               "totalDuration": {
                   $sum: "$exercises.duration"
               }
           }
        }], 
        (err, data) => {
            if (err) {
                console.log(data)
                res.send(err)
            } else {
                console.log(data)
                res.send(data)
            }
        }
    );
})

app.listen(3000, () => {
    console.log("App running on port 3000!");
});
