const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authorization");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const { LoginValidator } = require("../validations/validation");
const bcrypt = require("bcryptjs");

// get user route
// assuming req contains jwt token which will then show the user his details
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//login route
//authenticate user and get token
router.post("/", LoginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  // extract values from the request body
  const { email, password } = req.body;

  try {
    // see if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //jwt authentication
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 360000 }, //change to an hour in production
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.send(500).json({ msg: "Server error" });
  }
});

//login route
module.exports = router;
