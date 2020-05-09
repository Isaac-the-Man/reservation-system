const express = require('express');
const mongoose = require('mongoose');
const Record = require('../models/record');


const router = express.Router();

// api
/*
  check availibility
*/
router.get('/:id', async(req, res) => {
  try {
    var isVerified = true;
    const record = await Record.Model.findById(req.params.id);
    if (!record) {
      isVerified = false;
    }
  } catch (e) {
    isVerified = false;
  }
  res.render('verify', { status: isVerified });
});

// exports
module.exports = router;
