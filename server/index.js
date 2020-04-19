// DECLARE ALL VARIABLES
const express = require("express");
const db = require("./db");
const path = require("path");

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
        res.json(result);
      }
    }
  );
});

app.put("/api/cows/:id", (req, res) => {
  let id = path.basename(req.originalUrl);
  let values, query;
  if (!req.body.name && req.body.description) {
    values = [req.body.description, id];
    query = "UPDATE cows SET description = ? WHERE id = ?;";
  } else if (!req.body.description && req.body.name) {
    values = [req.body.name, id];
    query = "UPDATE cows SET name = ? WHERE id = ?;";
  } else {
    values = [req.body.name, req.body.description, id];
    query = "UPDATE cows SET name = ?, descirption = ? WHERE id = ?;";
  }

  db.query(query, values, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
});

app.delete("/api/cows/:id", (req, res) => {
  let id = path.basename(req.originalUrl);
  db.query("DELETE FROM cows WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
