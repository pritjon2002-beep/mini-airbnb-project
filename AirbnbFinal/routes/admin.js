const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // adjust path if named differently
const { isLoggedIn, isAdmin } = require("../middleware.js");
const adminController = require("../controller/admin.js");

router.get(
  "/",
  isLoggedIn,
  isAdmin,
  wrapAsync(adminController.renderDashboard),
);

module.exports = router;
