/** @format */

const express = require("express");
const config = require("./config");

let users = require("./users");

const app = express();

global.config = require("./config");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

// app.get("/:username", (req, res) => {
//   console.log(req.params);
//   res.send(`hlloworld`);
// });

app.get("/", (req, res) => {
  res.status(200).json({
    data: users,
    succes: true,
  });
});

app.get("/:id", (req, res) => {
  let user = users.find((user) => {
    if (user.id == req.params.id) {
      return user;
    }
  });
  res.status(200).json({
    data: user,
    succes: true,
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  req.body.id = parseInt(req.body.id);
  users.push(req.body);
  res.json({
    data: "user added",
    succes: true,
  });
});

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
