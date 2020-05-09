const express = require('express');
const mongoose = require('mongoose');


const router = express.Router();

// api
router.get('/', async (req, res) => {
  const template = {
    body: "home.ejs",
    nav: 0,
    customjs: "js/home.ejs"
  }
  res.render('template', { template: template });
});

// exports
module.exports = router;
