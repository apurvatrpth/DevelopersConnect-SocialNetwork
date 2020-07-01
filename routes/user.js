const express = require("express");
const router = express.Router();
const { UserValidator } = require("../validations/validation");
const { validationResult } = require("express-validator");

router.post("/user", UserValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
