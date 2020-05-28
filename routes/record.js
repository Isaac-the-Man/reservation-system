const express = require('express');
const mongoose = require('mongoose');
const Record = require('../models/record');
const TimeSlot = require('../models/timeslot');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const moment = require('moment');
const { parse } = require('json2csv');
var QRCode = require('qrcode')
var inlineBase64 = require('nodemailer-plugin-inline-base64');
const config = require('config');


const router = express.Router();

// api
/*
  get all records
*/
router.get('/', auth('admin'), async (req, res) => {
  var rangeQuery = {};
  if (req.query.from && req.query.till) {
    rangeQuery = {
      'timeslot.startDateTime': { $gte: moment(req.query.from).toDate(), $lte: moment(req.query.till).toDate() }
    }
  }
  console.log(req.query);
  const response = await Record.Model.paginate(rangeQuery, {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    sort: 'timeslot.startDateTime',
    lean: true
  });
  res.send(response);
});
/*
  create records
*/
router.post('/', async (req, res) => {
  // find timeslot
  const timeslot = await TimeSlot.Model.findById(req.body.timeslotid);
  if (!timeslot) {
    res.status(404).send('Time slot unavailable!');
    return;
  }
  // build record
  const newRecord = new Record.Model({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    childName: req.body.childName,
    childGrade: req.body.childGrade,
    childNation: req.body.childNation,
    timeslot: timeslot
  });
  const response = await newRecord.save();
  // create ticket qrcode
  const ticket = await QRCode.toDataURL(config.get('baseURL') + "/reserve/verify/" + newRecord._id);
  console.log(ticket);
  // send mail
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get('mail.senderAccount'), // generated ethereal user
      pass: config.get('mail.senderPassword') // generated ethereal password
    }
  });
  console.log('authed');
  transporter.use('compile', inlineBase64({ cidPrefix: 'eticket_' }));
  try {
    let info = transporter.sendMail({
      from: `"✔️PAS Reservation E-Ticket✔️" <${config.get('mail.senderAccount')}>`, // sender address
      to: newRecord.email, // list of receivers
      cc: config.get('mail.cc'),
      subject: "PAS Reservation E-Ticket", // Subject line
      html: `
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <body style="font-family: 'Roboto', sans-serif; color: black; background-color: #e3e3e3;">
        <div class="content" style="padding: 8pt 12pt; background-color:#343a40; color: white; margin: 12pt auto;">
          <h1>PAS Reservation System<h1/>
        </div>
        <div class="content" style="background-color: white; padding-left: 12pt; padding-right: 12pt; margin: 12pt auto;">
          <p>
          親愛的家長,<br>
          我們已收到您的資訊, 屆時您可於活動時間, 直接到校參加說明會.<br>
          期待在 5/31​ 下午 2點與您見面.<br>
          有任何問題歡迎email pas@pacificamerican.org或者是撥打 03-5586688 #825<br>
          </p>
          <p>Thank you for registering the event with us! Please present this E-Ticket to the staff members on your arrival.</p>
          <h3>Reservation Info:</h3>
          <ul>
            <li>Name: ${newRecord.name}</li>
            <li>email: ${newRecord.email}</li>
            <li>Phone: ${newRecord.phone}</li>
            <li>Date: ${Record.formatDateRange(moment(newRecord.timeslot.startDateTime),moment(newRecord.timeslot.endDateTime))}</li>
          </ul>
          <img src="${ticket}"></img>
        </div>
        <div class="content" style="padding: 8pt 12pt; background-color:#343a40; color: white; margin: 12pt auto;">
          <i>Copyright © Steven Wang @2020</i>
        </div>
      </body>
      <style>
        @media only screen and (max-width: 600px) {
          .content {
            width: 90%;
            max-width: 800px;
          }
      </style>
      `
    });
    console.log('sent!');
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send('Error occured while sending mail');
  }
});
/*
  delete rocords
*/
router.delete('/:id', auth('admin'), async (req, res) => {
  const response = await Record.Model.findByIdAndDelete(req.params.id);
  res.send(response);
});
/*
  export as csv
*/
router.get('/csv', auth('admin'), async (req, res) => {
  var rangeQuery = {};
  if (req.query.from && req.query.till) {
    rangeQuery = {
      'timeslot.startDateTime': { $gte: moment(req.query.from).toDate(), $lte: moment(req.query.till).toDate() }
    }
  }
  const records = await Record.Model.find(rangeQuery).sort('timeslot.startDateTime').lean();
  const csv = parse(records, { fields: ['name', 'email', 'phone', 'city', 'childName'
    , 'childGrade', 'childNation', 'timeslot.startDateTime', 'timeslot.endDateTime', 'completion'], excelStrings: true });
  res.attachment('record.csv');
  res.status(200);
  res.send(csv);
});

// exports
module.exports = router;
