const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/form');


const router = express.Router();

// api
/*
  get form metadata
*/
router.get('/', async (req, res) => {
  const formData = await Form.Model.findOne({}).select('_id title description isDisabled').lean();
  if (!formData) {
    console.log('Missing form data')
    res.status(500).send('Something broke... Please contact admins for further support.');
    return;
  }
  res.send(formData);
});
/*
  update form metadata
*/
router.post('/', async (req, res) => {
  // read form data
  const formData = await Form.Model.findOne({}).select('_id title description isDisabled');
  if (!formData) {
    console.log('Missing form data')
    res.status(500).send('Something broke... Please contact admins for further support.');
    return;
  }
  console.log(req.body);
  // update and save
  formData.title = req.body.title;
  formData.description = req.body.description;
  formData.isDisabled = req.body.isDisabled;
  const response = await formData.save();
  res.send(response);
});

// exports
module.exports = router;
