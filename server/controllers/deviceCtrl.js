const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  getUserSensors: (req, res, next) => {
    db.read_user_sensors([req.user.id], (err, response) => {
      res.json(response);
    });
  },
  getSettings: (req, res, next) => {
    db.read_device_settings([req.params.sensorId], (err, response) => {
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
  destroySensor: (req, res, next) => {
    var nickname = req.query.nickname.split(',').join(' ');
    db.destroy_sensor([req.user.id, nickname], (err, response) => {
      if (err) {
        res.status(500).send("Failed to delete sensor");
      } else {
        res.send(200);
      }
    });
  }
}; //End Export
