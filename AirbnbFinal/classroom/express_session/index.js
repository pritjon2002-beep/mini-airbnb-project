const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
  secret: "express-session-secret",
  resave: "false",
  saveUninitialized: "true",
};

app.use(session(sessionOption));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  console.log(name);
  req.flash("success", "user registered successfully");
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("show.ejs", {
    name: req.session.name,
    message: req.flash("success"),
  });
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
