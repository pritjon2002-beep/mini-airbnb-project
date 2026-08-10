const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("expressRouter");
});

//users
//index route
app.get("/users", async (req, res) => {
  console.log("get for  users");
});

//show route
app.get("/users/:id", async (req, res) => {
  console.log("get for show users");
});

//post route
app.post("/users", async (req, res) => {
  console.log("post for add users");
});

//delete route
app.delete("/users", async (req, res) => {
  console.log("post for delete users");
});

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
