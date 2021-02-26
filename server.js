const express = require("express");
const path = require("path")
const mongojs = require("mongojs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);

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
    console.log("Finding all workouts?")
    db.exercise.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    })
    console.log("Done")
})

app.put("/api/workouts/:id", (req, res) => {
    console.log("Updating....")
    // check for exercise type first? do that later
    let day =  new Date().setDate(new Date().getDate()-9)

    // resistance exercise
    db.exercise.update(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $set: {day: day},
            $push: {
                exercises: {
                    type: req.body.type,
                    name: req.body.name,
                    weight: req.body.weight,
                    sets: req.body.sets,
                    reps: req.body.reps,
                    duration: req.body.duration,
                    length: 5
                }
            },

        },
        (err, data) => {
            if(err){
                console.log(data)
                res.send(err)
            } else {
                console.log(data)
                res.send(data)
            }
        }
    )
    console.log("Done")
})

app.post("/api/workouts", (req, res) => {
    console.log("Adding workout....")
    db.exercise.insert(req.body, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
    console.log("Done")
})

app.get("/api/workouts/range", (req, res) => {
    console.log("Finding")
    db.exercise.find({}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.json(data)
        }
    })
    console.log("Done")
})

app.listen(3000, () => {
    console.log("App running on port 3000!");
});
