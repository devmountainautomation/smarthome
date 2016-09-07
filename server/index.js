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

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config.js');
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

// Pubnub setup

var pubnub = new Pubnub({
  subscribeKey: config.SubscribeKey,
  publishKey: config.PublishKey,
  secretKey: config.SecretKey,
  ssl: true
});

pubnub.addListener({
  message: function(message) {
    console.log("This is the message:", message);
  },
  presence: function(presence) {
    console.log("This is the presence:", presence);
  },
  status: function(status) {
    console.log("This is the status:", status);
  }
});

pubnub.subscribe({
  channels: ['my_channel'],
  withPresence: true
});

// Controllers
const userCtrl = require('./controllers/userCtrl.js');

//endpoints

//*********** Get Requests ********************//
app.get('/users/', userCtrl.getUser);
app.get('/users/sensors/', userCtrl.getUserSensors);
app.get('/modulees', userCtrl.getModules);

//*********** Put Requests *******************//
app.put('/settings/:type', userCtrl.updateSettings);
app.put('/users/', userCtrl.updateUser);

//*********** Post Requests *****************//
app.post('/settings/:type', userCtrl.createSettings);
app.post('/users', userCtrl.createUser);
app.post('/sensors/', userCtrl.createSensor);

//*********** Delete Requests ***************//
app.delete('/users/', userCtrl.destroyUser);
app.delete('/sensors/:type', userCtrl.destroySensor);

//auth
const passportJS = require('./config/passport');

//auth endpoints
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/'
}));

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

app.post('/auth/local', passport.authenticate('local'), (req, res) => {
  res.status(200).redirect('/home');
});

app.get('/home', userCtrl.requireAuth, (req, res) => {
  res.redirect('/#/home');
});

app.get('/logout', userCtrl.logout);

app.get('/me', (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(400).json('Not Logged In!');
  }
});

// Port Ready
app.listen(config.port, () => {
  console.log('Listening on Port: ', config.port);
});
