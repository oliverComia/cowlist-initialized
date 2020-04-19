// DECLARE ALL VARIABLES
const express = require("express");
const db = require("./db");

// DECLARE THE MIDDLEWARE
const parser = require("body-parser");
const morgan = require("morgan");

// CALL EXECUTE EXPRESS
const app = express();
module.exports.app = app;

// SET UP THE PORT
const port = 3000;

// EXECUTE THE PARSING AND LOGGING
app.use(parser.json());
// app.use(morgan("dev"));

// EXECUTE STATIC FILES
app.use(express.static("./client/dist"));

app.get("/", (req, res) => {
  res.render("index");
  // res.send("Hello World!"));
});

// CREATE ROUTERS/CONTROLLERS/MODELS combined
app.get("/api/cows", (req, res) => {
  db.query("SELECT  * FROM cows;", (err, results) => {
    if (err) throw err;
    else {
      res.json(results);
    }
  });
});

app.post("/api/cows", (req, res) => {
  let values = [req.body.name, req.body.description];
  db.query(
    "INSERT INTO cows (name, description) VALUES (?,?);",
    values,
    (err, result) => {
      if (err) res.sendStatus(400);
      else {
        console.log("result", result);
        res.json(result);
      }
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
