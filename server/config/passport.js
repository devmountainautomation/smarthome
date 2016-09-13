const app = require('../index.js');
const auth = require('./auth');
const db = app.get('db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: auth.facebookAuth.clientID,
  clientSecret: auth.facebookAuth.clientSecret,
  callbackURL: auth.facebookAuth.callbackURL,
  profileFields: ['id', 'name', 'displayName', 'photos', 'email']
}, (token, refreshToken, profile, done) => {
  db.users.findOne({
    email: profile.emails[0].value
  }, (err, user) => {
    if (err) {
      done(err, null);
    } else if (user) {
      db.users.findOne({
        fb: profile.id
      }, (err, user) => {
        if (err) {
          done(err, null);
        } else if (user) {
          console.log("found user", err, user);
          done(null, user);
        } else {
          db.update_fb_id([profile.emails[0].value, profile.id], (err, res) => {
            db.read_user_by_email([profile.emails[0].value], (err, updatedUser) => {
              if (!updatedUser.photo) {
                db.update_photo([profile.emails[0].value, profile.photos[0].value], (err, res) => {
                  db.read_user_by_email([profile.emails[0].value], (err, photoUpdate) => {
                    done(null, photoUpdate);
                  });
                });
              } else {
                done(null, updatedUser);
              }
            });
          });
        }
      });
    } else {
      db.users.insert({
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        fb: profile.id
      }, (err, newUser) => {
        console.log("new user", newUser);
        done(null, newUser);
      });
    }
  });

}));

passport.use(new GoogleStrategy({
  clientID: auth.googleAuth.consumerKey,
  clientSecret: auth.googleAuth.consumerSecret,
  callbackURL: auth.googleAuth.callbackURL,
}, (token, refreshToken, profile, done) => {
  db.users.findOne({
    email: profile.emails[0].value
  }, (err, user) => {
    if (err) {
      done(err, null);
    } else if (user) {
      db.users.findOne({
        google: profile.id
      }, (err, user) => {
        if (err) {
          done(err, null);
        } else if (user) {
          console.log("found user", err, user);
          done(null, user);
        } else {
          db.update_google_id([profile.emails[0].value, profile.id], (err, res) => {
            db.read_user_by_email([profile.emails[0].value], (err, updatedUser) => {
              if (!updatedUser.photo) {
                db.update_photo([profile.emails[0].value, profile.photos[0].value], (err, res) => {
                  db.read_user_by_email([profile.emails[0].value], (err, photoUpdate) => {
                    done(null, photoUpdate);
                  });
                });
              } else {
                done(null, updatedUser);
              }
            });
          });
        }
      });
    } else {
      db.users.insert({
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        google: profile.id
      }, (err, newUser) => {
        console.log("new user", newUser);
        done(null, user);
      });
    }
  });

}));

passport.use(new LocalStrategy((username, password, done) => {
  db.get_user_by_email([username], (err, user) => {
    user = user[0];
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  });
}));


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
