const express = require('express');
const mongoose = require('mongoose');


router = express.Router();

// api
router.get('/', async (req, res) => {
  const carries = {
    error: req.query.error
  }
  res.render('login', carries);
});

// exports
module.exports = router;
