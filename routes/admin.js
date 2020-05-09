const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/form');
const TimeSlot = require('../models/timeslot');


const router = express.Router();

// api
router.get('/', async (req, res) => {
  if (req.session.loggedin) {
    const template = {
      body: "admin.ejs",
      nav: 1,
      customjs: "js/admin.ejs"
    }
    res.render('template', { template: template});
    return;
  }
  res.redirect('/reserve/login');
});

// exports
module.exports = router;
