const express = require("express");
const app = express();
const users = require("./routes/user.js");

app.get("/", (req, res) => {
  res.send("expressRouter");
});

//using routes/user.js file
app.use("/", users);

//posts
//index route
app.get("/posts", async (req, res) => {
  console.log("get for  posts");
});

//show route
app.get("/posts/:id", async (req, res) => {
  console.log("get for show posts");
});

//post route
app.post("/posts", async (req, res) => {
  console.log(" for add s");
});

//delete route
app.delete("/posts", async (req, res) => {
  console.log(" for delete posts");
});

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
