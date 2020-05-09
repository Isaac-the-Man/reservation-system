const express = require('express');
const mongoose = require('mongoose');


router = express.Router();

// api
router.get('/', async (req, res) => {
  res.render('login');
});

// exports
module.exports = router;
