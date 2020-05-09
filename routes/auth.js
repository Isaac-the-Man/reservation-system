const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../models/admin');


router = express.Router();

// api
router.post('/', async (req, res) => {
  // check db
  const response = Admin.Model.find({ account: req.body.account, password: req.body.password }).lean();
  if (!response) {
    res.status(403).send('unauthorized');
    return;
  }
  req.session.loggedin = true;
  req.session.account = req.body.account;
  res.redirect('/reserve/admin');
});

// exports
module.exports = router;
