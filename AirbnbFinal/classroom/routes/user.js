const express = require("express");
const router = express.Router();

//users
//index route
router.get("/users", async (req, res) => {
  res.send("get for  users");
});

//show route
router.get("/users/:id", async (req, res) => {
  res.send("get for show users");
});

//post route
router.post("/users", async (req, res) => {
  res.send("post for add users");
});

//delete route
router.delete("/users", async (req, res) => {
  res.send("post for delete users");
});

module.exports = router;
