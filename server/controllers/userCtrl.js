const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  checkAuth: (req, res, next) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else if (!req.user) {
      res.status(200).json('unauthorized');
    }
  },
  requireAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  },
  getUser: (req, res, next) => {
    db.read_user([req.user.name], (err, response) => {
      res.json(response);
    });
  },
  updateUser: (req, res, next) => {
    var data = req.body;
    db.update_user([req.user.id, data.name, data.email, data.phone, data.password, data.pubsub, data.pubpub, data.pubchan], (err, response) => {
      if (err) {
        res.status(500).send("Update Failed");
      } else {
        res.sendStatus(200);
      }
    });
  },
  createLocalUser: (req, res, next) => {
    var data = req.body;
    db.users.findOne({
      email: data.email
    }, (err, user) => {
      if (err) {
        res.status(500).send('User add Failed');
      } else if (user) {
        if (user.password) {
          res.status(404).send("User already exists");
        } else {
          bcrypt.hash(data.password, saltRounds, (err, hash) => {
            db.update_user_password([data.email, data.phone, hash], (err, res) => {});
          });
          res.status(200).send("User Updated");
        }
      } else {
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
          db.users.insert({
            name: data.name,
            email: data.email,
            password: hash,
            phone: data.phone
          });
        });
        res.status(200).send("User Added!");
      }
    });
  },
  logout: (req, res, next) => {
    if (req.user) {
      req.logout();
      res.redirect('/#/');
    }
    else {
        res.status(500).send("No User data Provided");
    }
  },
  destroyUser: (req, res, next) => {
    db.destroy_user_settings([req.user.id], (err, response) => {
      db.destroy_user_sensors([req.user.id], (err, response) => {
        db.destroy_user([req.user.id], (err, response) => {});
      });
    });
  }
}; //End Export
