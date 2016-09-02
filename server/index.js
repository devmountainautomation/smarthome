const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const cookie = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const pubnub = require('pubnub');

const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config');
const auth = require('./config/auth');
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

// Controllers
const userCtrl = './controllers/userCtrl';

//endpoints

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
   scope: ['id', 'email', 'displayName', 'photos']
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
