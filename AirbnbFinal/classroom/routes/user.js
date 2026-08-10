const express = require("express");
const router = express.Router();

//users
//index route
router.get("/", async (req, res) => {
  res.send("get for  users");
});

//show route
router.get("/:id", async (req, res) => {
  res.send("get for show users");
});

//post route
router.post("/", async (req, res) => {
  res.send("post for add users");
});

//delete route
router.delete("/", async (req, res) => {
  res.send("post for delete users");
});

module.exports = router;
