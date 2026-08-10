const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/", (req, res) => {
  res.send("expressRouter");
});

//using routes/user.js file
app.use("/users", users);

//using routes/user.js file
app.use("/posts", posts);

app.listen(8080, () => {
  console.log("sever is running on port 8080");
});
