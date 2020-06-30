const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => res.json('hi3'));

module.exports = router;
