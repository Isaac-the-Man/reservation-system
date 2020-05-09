const express = require('express');


const router = express.Router();

// api
router.get('/*', async (req, res) => {
  res.render('notfound');
});

// exports
module.exports = router;
