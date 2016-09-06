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
    var userName = req.params.name.split(',').join(' ');
    db.read_user([userName], (err, response) => {
      res.json(response);
    });
  },
  getUserSensors: (req, res, next) => {
    var name = req.params.name.split(',').join(' ');
    db.get_user_id([name], (err, response) => {
      var user = response.id;
    });
    db.read_user_sensors([user], (err, response) => {
      res.json(response);
    });
  },
  getSensors: (req, res, next) => {
    db.read_sensors((err, response) => {
      res.json(response);
    });
  },
  updateSettings: (req, res, next) => {
    if (req.query.type) {
      var data = req.body;
      var name = req.params.name.split(',').join(' ');
      db.get_user_id([name], (err, response) => {
        var userId = response.id;
      });
      db.get_module_id([req.query.type], (err, response) => {
        var moduleId = response.id;
      });
      db.update_settings([moduleId, userId, data.active, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
        if (err) {
          res.status(500).send('Update Failed');
        }
        res.sendStatus(200);
      });
    }
  },
  updateUser: (req, res, next) => {
    var data = data;
    var name = req.params.name.split(',').join(' ');
    db.get_user_id([name], (err, response) => {
      var userId = response.id;
    });
    db.update_user([userId, data.name, data.email, data.phone, data.pubsub, data.pubpub, data.pubchan], (err, response) => {
      if (err) {
        res.status(500).send("Update Failed");
      } else {
        res.sendStatus(200);
      }
    });
  },
  createSettings: (req, res, next) => {
    var data = req.body;
    if (req.query.type) {
      var name = req.params.name.split(',').join(' ');
      db.get_user_id([name], (err, response) => {
        var userId = response.id;
      });
      db.get_module_id([req.query.type], (err, response) => {
        var moduleId = response.id;
      });
      db.create_sensor_settings([moduleId, userId, data.active, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
        if (err) {
          res.status(500).send("Failed to add settings");
        } else {
          res.send(200);
        }
      });
    }
  },
  createUser: (req, res, next) => {
    if (req.body) {
      var data = req.body;
      db.create_user([data.name, data.email, data.phone, data.pubsub, data.pubpub, data.pubchan, data.google, data.fb], (err, response) => {
        if (err) {
          res.status(500).send('Failed User Add');
        } else {
          res.send(200);
        }
      });
    }
  },
    createLocalUser: (req, res, next) => {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.users.insert({name: req.body.name, email: req.body.email,
          password: hash, phone: req.body.phone});
      });
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
    var name = req.params.name.split(',').join(' ');
    db.get_module_id([data.type], (err, response) => {
      var type = response.type;
    });
    db.get_user_id([name], (err, response) => {
      var userId = response.id;
    });
    db.create_sensor([data.nickname, userId, type], (err, response) => {
      if (err) {
        res.status(500).send('Failed to add Sensor');
      } else {
        res.send(200);
      }
    });
  },
  destroyUser: (req, res, next) => {
    var name = req.params.name.split(',').join(' ');
    db.destroy_user([name], (err, response) => {
      if (err) {
        res.status(500).send("Failed to devare user");
      } else {
        res.send(200);
      }
    });
  },
  destroySensor: (req, res, next) => {
    if (req.query.nickname) {
      var name = req.params.name.split(',').join(' ');
      db.get_user_id([name], (err, response) => {
        var user = response.id;
      });
      var nickname = req.query.nickname.split(',').join(' ');
      db.destroy_sensor([user, nickname], (err, response) => {
        if (err) {
          res.status(500).send("Failed to devare sensor");
        } else {
          res.send(200);
        }
      });
    }
  }

};
