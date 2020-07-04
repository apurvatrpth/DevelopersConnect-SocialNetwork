const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authorization");
const User = require("../models/userModel");

//middleware for auth
router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//login route
module.exports = router;
