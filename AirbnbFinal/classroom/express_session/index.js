const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({ secret: "express-session-secret" }));

app.get("/", (req, res) => {
  res.send("welcome to express-session");
});

app.get("/test", (req, res) => {
  res.send("test successful");
});

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
