const express = require("express");
const app = express();
const session = require("express-session");

const sessionOption = {
  secret: "express-session-secret",
  resave: "false",
  saveUninitialized: "true",
};

app.use(session(sessionOption));

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  console.log(name);
  res.send(name);
});

app.get("/hello", (req, res) => {
  res.send(`Hello ${req.session.name}`);
});

app.get("/", (req, res) => {
  res.send("welcome to express-session");
});

app.get("/test", (req, res) => {
  res.send("test successful");
});

app.get("/reqcounter", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`you sent request ${req.session.count} times`);
});

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
