const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const TimeSlot = require('../models/timeslot');


const router = express.Router();

// api
/*
  get timeslots
*/
router.get('/', async (req, res) => {
  // query all
  const slots = await TimeSlot.Model.find({})
    .select('_id startDateTime endDateTime')
    .sort('startDateTime').lean();
  // return
  res.send(slots);
});
/*
  new timeslots
*/
router.post('/', auth('admin'), async (req, res) => {
  // parse url
  console.log(req.body);
  // new time slot
  const newTimeSlot = new TimeSlot.Model({
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime
  });
  const response = await newTimeSlot.save();
  res.send(response);
});
/*
  delete timeslots
*/
router.delete('/:id', auth('admin'), async (req, res) => {
  const response = await TimeSlot.Model.findByIdAndDelete(req.params.id);
  res.send(response);
});

// exports
module.exports = router;
