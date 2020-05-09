const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const session = require('express-session');
// import routes
const routeHome = require('./routes/home');
const routeadmin = require('./routes/admin');
const routeTimeSlot = require('./routes/timeslot');
const routeForm = require('./routes/form');
const routeRecord = require('./routes/record');
const routeVerify = require('./routes/verify');
const routeComplete = require('./routes/completed');
const routeAuth = require('./routes/auth');
const routeLogin = require('./routes/login');
const route404 = require('./routes/notfound');


// connect with mongoose
mongoose.connect('mongodb://localhost:27017/reservation-system',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => { console.log('Connected to Database...') })
  .catch(() => { console.log('Unable to Connect to Database...') });

// start app
const app = express();
app.set('view engine', 'ejs');
app.use(session({
  secret: 'ih;;i{bL6y,8Y&R!+4;#oUdMsy`/oW+f3`et/.IxHCM<kS|I|Zl*:MHEvcVUC!c',
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
// pages
app.use('/reserve/home', routeHome);
app.use('/reserve/admin', routeadmin);
app.use('/reserve/verify', routeVerify);
app.use('/reserve/completed', routeComplete);
app.use('/reserve/login', routeLogin);
// api
app.use('/api/timeslot', routeTimeSlot);
app.use('/api/form', routeForm);
app.use('/api/record', routeRecord);
app.use('/api/auth', routeAuth);
// 404 handler
app.use('/reserve', route404);
// error handler
app.use ( function(req, res, next, err) {
  res.status(500).send('Something went wrong...');
  console.log(err);
});

// connect to port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
