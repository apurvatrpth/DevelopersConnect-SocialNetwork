const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.json("hi4"));

module.exports = router;
