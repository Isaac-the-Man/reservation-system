const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../models/admin');


router = express.Router();

// api
/*
sign in
*/
router.post('/', async (req, res) => {
  // check db
  const response = await Admin.Model.find({ account: req.body.account, password: req.body.password }).lean();
  if (response.length <= 0) {
    res.redirect(`/reserve/login?error=1`);
    return;
  }
  req.session.loggedin = true;
  req.session.account = req.body.account;
  res.redirect(`/reserve/${req.session.redirectTo}${(req.session.param) ? '/' + req.session.param : ''}`);
});
/*
sign out
*/
router.get('/', (req, res) => {
  req.session.destroy();
  res.send('log out');
});

// exports
module.exports = router;
