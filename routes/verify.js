const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const moment = require('moment');
const Record = require('../models/record');


const router = express.Router();

// api
/*
  check availibility
*/
router.get('/:id', auth('verify'), async(req, res) => {
  try {
    var isVerified = true;
    var isExpired = true;
    var data;
    const record = await Record.Model.findById(req.params.id);
    if (!record) {
      isVerified = false;
    } else {
      data = {
        name: record.name,
        email: record.email,
        phone: record.phone,
        city: record.city,
        childName: record.childName,
        childGrade: record.childGrade,
        childNation: record.childNation,
        timeslot: `${moment(record.timeslot.startDateTime).format('dddd, MMMM Do, H:mm')} ~ ${moment(record.timeslot.endDateTime).format('dddd, MMMM Do, H:mm')}`,
      }
      if (!record.completion) {
        isExpired = false;
      } else {
        data.completion = moment(record.completion).format('dddd, MMMM Do, H:mm');
      }
    }
    // mark as complete
    if (isVerified && !isExpired) {
      record.completion = moment();
      await record.save();
    }
  } catch (e) {
    console.log(e);
    isVerified = false;
  }
  res.render('verify', { status: isVerified, expired: isExpired, data: data });
});

// exports
module.exports = router;
