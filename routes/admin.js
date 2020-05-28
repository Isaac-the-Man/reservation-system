const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const Form = require('../models/form');
const TimeSlot = require('../models/timeslot');


const router = express.Router();

// api
router.get('/', auth('admin'), async (req, res) => {
  const template = {
    body: "admin.ejs",
    nav: 1,
    customjs: "js/admin.ejs"
  }
  res.render('template', { template: template, isAdmin: true });
});

// exports
module.exports = router;
