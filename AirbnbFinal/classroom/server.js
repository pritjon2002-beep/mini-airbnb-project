const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  res.send("expressRouter");
});

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
