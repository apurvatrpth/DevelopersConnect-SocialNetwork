const express = require('express');

const router = express.Router();

router.get('/auth', (req, res) => res.json('hi2'));

module.exports = router;
