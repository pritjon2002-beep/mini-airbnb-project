const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("welcome to express-session");
});

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
