const express = require("express");
const router = express.Router();

//posts
//index route
router.get("/", async (req, res) => {
  res.send("get for  posts");
});

//show route
router.get("/:id", async (req, res) => {
  res.send("get for show posts");
});

//post route
router.post("/", async (req, res) => {
  res.send(" for add posts");
});

//delete route
router.delete("/:id", async (req, res) => {
  res.send(" for delete posts");
});

module.exports = router;
