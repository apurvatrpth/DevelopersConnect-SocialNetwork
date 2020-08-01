const express = require("express");
const router = express.Router();
const { UserValidator } = require("../validations/validation");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", UserValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  // extract values from the request body
  const { name, email, password } = req.body;

  try {
    // see if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    // save new user
    user = new User({ name, email, password, avatar });

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    res.sendStatus(500).json({ msg: "Server error" });
  }
});

module.exports = router;
