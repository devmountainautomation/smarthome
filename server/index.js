const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const cookie = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const Pubnub = require('pubnub');
const jstz = require('jstz');
const timeZone = require('moment-timezone');
const nodemailer = require('nodemailer');

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config.js');
const client = require('twilio')(config.twilioSID, config.twilioAuthToken);
const auth = require('./config/auth.js');
const connString = config.connString;
const path = require('path');

const app = module.exports = express();


app.use(cookie(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors());
app.use(express.static(__dirname + './../public'));
const databaseObject = massive.connectSync({
  connectionString: connString
});
app.set('db', databaseObject);
const db = app.get('db');

// Session and Passport

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'html');

// Pubnub
const pubnub = require('./controllers/pubnub.js');

// Controllers
const userCtrl = require('./controllers/userCtrl.js');
const deviceCtrl = require('./controllers/deviceCtrl.js');

////////////// Endpoints /////////////////////////

//*********** Get Requests ********************//
app.get('/users/', userCtrl.getUser);
app.get('/users/sensors/', deviceCtrl.getUserSensors);
app.get('/modules', deviceCtrl.getModules);
app.get('/settings/:sensorId', deviceCtrl.getSettings);
app.get('/notifications', deviceCtrl.getNotifications);
app.get('/history/:id', deviceCtrl.readHistory);

//*********** Put Requests *******************//
app.put('/settings', deviceCtrl.updateSettings);
app.put('/users/', userCtrl.updateUser);
app.put('/notifications/:id', deviceCtrl.updateNotification);

//*********** Post Requests *****************//
app.post('/settings/:type', deviceCtrl.createSettings);
app.post('/users', userCtrl.createLocalUser);
app.post('/sensors/:type', deviceCtrl.createSensor);

//*********** Delete Requests ***************//
app.delete('/users', userCtrl.destroyUser);
app.delete('/sensors/:id', deviceCtrl.destroySensor);

//auth
const passportJS = require('./config/passport.js');

//auth endpoints
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/#/dashboard',
  failureRedirect: '/#/login'
}));

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#/dashboard',
  failureRedirect: '/#/login'
}));

app.post('/auth/local', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

app.get('/logout', userCtrl.logout);

app.get('/me', (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(200);
  }
});

app.get('/checkAuth', userCtrl.checkAuth);

// Port Ready
app.listen(config.port, () => {
  console.log('Listening on Port: ', config.port);
});
