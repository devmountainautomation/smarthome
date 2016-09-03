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

    createLocalUser: (req, res, next) => {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.users.insert({name: req.body.name, email: req.body.email,
          password: hash, phone: req.body.phone})
      });
    },

    logout: (req, res, next) => {
        if (req.user) {
            req.logout();
            res.redirect('/#/');
        } else {
            res.redirect('/');
        }

    },
};
