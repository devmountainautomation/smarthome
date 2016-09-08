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
  getUserSensors: (req, res, next) => {
    db.read_user_sensors([req.user.id], (err, response) => {
      res.json(response);
    });
  },
  getModules: (req, res, next) => {
    db.read_modules((err, response) => {
      res.json(response);
    });
  },
  updateSettings: (req, res, next) => {
    var data = req.body;
    db.get_module_id([req.params.type], (err, response) => {
      var moduleId = response.id;
    });
    db.update_settings([moduleId, req.user.id, data.active, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
      if (err) {
        res.status(500).send('Update Failed');
      }
      res.sendStatus(200);
    });
  },
  updateUser: (req, res, next) => {
    var data = data;
    db.update_user([req.user.id, data.name, data.email, data.phone, data.pubsub, data.pubpub, data.pubchan], (err, response) => {
      if (err) {
        res.status(500).send("Update Failed");
      } else {
        res.sendStatus(200);
      }
    });
  },
  createSettings: (req, res, next) => {
    var data = req.body;
    db.get_module_id([req.params.type], (err, response) => {
      var moduleId = response.id;
    });
    db.create_sensor_settings([moduleId, req.user.id, data.active, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
      if (err) {
        res.status(500).send("Failed to add settings");
      } else {
        res.send(200);
      }
    });
  },
  createLocalUser: (req, res, next) => {
    var data = req.body;
    bcrypt.hash(data.password, saltRounds, function(err, hash) {
      db.users.insert({
        name: data.name,
        email: data.email,
        password: hash,
        phone: data.phone
      });
    });
    res.status(200).send("User Added!");
  },
  logout: (req, res, next) => {
    if (req.user) {
      req.logout();
      res.redirect('/#/');
    }
    res.status(500).send("No User data Provided");
  },
  createSensor: (req, res, next) => {
    var data = req.body;
    db.get_module_id([data.type], (err, response) => {
      var type = response.type;
    });
    db.create_sensor([data.nickname, req.user.id, type], (err, response) => {
      if (err) {
        res.status(500).send('Failed to add Sensor');
      } else {
        res.send(200);
      }
    });
  },
  destroyUser: (req, res, next) => {
    db.destroy_user([req.user.name], (err, response) => {
      if (err) {
        res.status(500).send("Failed to devare user");
      } else {
        res.send(200);
      }
    });
  },
  destroySensor: (req, res, next) => {
    var nickname = req.query.nickname.split(',').join(' ');
    db.destroy_sensor([req.user.id, nickname], (err, response) => {
      if (err) {
        res.status(500).send("Failed to devare sensor");
      } else {
        res.send(200);
      }
    });
  }

};
