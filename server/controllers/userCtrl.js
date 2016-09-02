const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcrypt');

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
    logout: (req, res, next) => {
        if (req.user) {
            req.logout();
            res.redirect('/#/');
        } else {
            res.redirect('/');
        }

    },
};
