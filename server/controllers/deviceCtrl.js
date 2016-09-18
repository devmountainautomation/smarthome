const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcrypt');
const moment = require('moment');
const config = require('../config/config.js');
const nodemailer = require('nodemailer');
const client = require('twilio')(config.twilioSID, config.twilioAuthToken);
const saltRounds = 10;

// var EMAIL_ACCOUNT_USER = config.emailAccountUser;
// var EMAIL_ACCOUNT_PASSWORD = config.emailPassword;
// var YOUR_NAME = config.emailName;
//
//
// var smtpTransport = nodemailer.createTransport({
//   service: "gmail", // sets automatically host, port and connection security settings
//   auth: {
//     user: EMAIL_ACCOUNT_USER,
//     pass: EMAIL_ACCOUNT_PASSWORD
//   }
// });


module.exports = {
  getUserSensors: (req, res, next) => {
    db.read_user_sensors([req.user.id], (err, response) => {
      res.json(response);
    });
  },
  getSettings: (req, res, next) => {
    db.read_device_settings([req.params.sensorId], (err, response) => {
      response[0].start_time = moment(response[0].start_time).format('h:mm A');
      response[0].end_time = moment(response[0].end_time).format('h:mm A');
      res.json(response);
    });
  },
  getModules: (req, res, next) => {
    db.read_modules((err, response) => {
      res.json(response);
    });
  },
  getNotifications: (req, res, next) => {
    db.read_history([req.user.id], (err, response) => {
      var history = [];
      for (var i = 0; i < response.length; i++) {
        if (response[i].seen === false && response[i].alert === true) {
          var obj = {};
          obj.id = response[i].id;
          obj.status = response[i].status;
          obj.timeStamp = moment(response[i].time_stamp).format('h:mm A MMM DD, YYYY');
          obj.nickname = response[i].nickname;
          history.push(obj);
        }
      }
      res.json(history);
    });
  },
  updateNotification: (req, res, next) => {
    db.update_notification([req.params.id], (err, response) => {});
    res.sendStatus(200);
  },
  updateSettings: (req, res, next) => {
    var data = req.body;
    data.start_time = '2016-09-12 ' + data.start_time;
    data.end_time = '2016-09-12 ' + data.end_time;
      db.update_settings([data.sensor_id, req.user.id, data.active, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
        if (err) {
          res.status(500).send('Update Failed');
        }
        res.send(200);
      });
  },
  createSettings: (req, res, next) => {
    var data = req.body;
    var type = '';
    switch (req.params.type) {
      case 'breech':
        type = 'Door/Window Sensor';
        break;
      case 'smoke':
        type = 'Smoke Detector';
        break;
      case 'motion':
        type = 'Motion Sensor';
        break;
      case 'sound':
        type = 'Sound Sensor';
        break;
      default:
        type = null;
    }
    data.start_time = '2016-09-12 ' + data.start_time;
    data.end_time = '2016-09-12 ' + data.end_time;
    db.get_module_id([type], (err, response) => {
      var moduleId = response[0].id;
      if (!data.email) data.email = false;
      if (!data.sms) data.sms = false;
      db.read_device_id([data.nickname, req.user.id], (err, response) => {
        data.sensor_id = response[0].sensor_id;
        db.create_sensor_settings([req.user.id, moduleId, data.sensor_id, true, data.email, data.sms, data.start_time, data.end_time], (err, response) => {
          if (err) {
            res.status(500).send("Failed to add settings");
          } else {
            res.send(200);
          }
        });
      });
    });
  },
  createSensor: (req, res, next) => {
    var data = req.body;
    var type = '';
    switch (req.params.type) {
      case 'breech':
        type = 'Door/Window Sensor';
        break;
      case 'smoke':
        type = 'Smoke Detector';
        break;
      case 'motion':
        type = 'Motion Sensor';
        break;
      case 'sound':
        type = 'Sound Sensor';
        break;
      default:
        type = null;
    }
    db.get_module_id([type], (err, response) => {
      var moduleID = response[0].id;
      db.create_sensor([data.nickname, req.user.id, moduleID], (err, response) => {
        if (err) {
          res.status(500).send('Failed to add Sensor');
        } else {
          res.send(200);
        }
      });
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
    },
    readHistory: (req, res, next) => {
      db.read_all_history([req.params.id], (err, resp) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.json(resp);
        }
      });
    },
    // sendText: function(req, res, next) {
    //   var messages = [];
    //   for (var i = 0; i < req.body.to.length; i++) {
    //     client.sendMessage({
    //       to: req.body.to[i],
    //       from: req.body.from,
    //       body: req.body.message
    //     }, function(err, message) {
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         messages.push(message);
    //       }
    //     });
    //   }
    //   res.send("messages sent");
    // },
    // sendEmail: function(req, res, next) {
    //   smtpTransport.sendMail({
    //     from: '"Home One" <homeoneautomation@gmail.com>',
    //     to: 'andersen.craigm@gmail.com',
    //     subject: 'HomeOne Alert!',
    //     text: 'Your Front Door is Open'
    // }, () => {
    //       res.send("email sent");
    //     smtpTransport.close();
    //   });
    // }
}; //End Export
