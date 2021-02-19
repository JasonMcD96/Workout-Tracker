const express = require("express");
const path = require("path")
// const mongojs = require("mongojs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// const databaseUrl = "zoo";
// const collections = ["animals"];

// const db = mongojs(databaseUrl, collections);

// db.on("error", error => {
//   console.log("Database Error:", error);
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
//   db.animals.find({}, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
//   db.animals.find().sort({ name: 1 }, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

app.get("/weight", (req, res) => {
//   db.animals.find().sort({ weight: -1 }, (err, found) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(found);
//     }
//   });
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
