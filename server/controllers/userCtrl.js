const app = require('../index.js');
const config = require('../config/config.js');
const db = app.get('db');
const Pubnub = require('pubnub');
const moment = require('moment');
const jstz = require('jstz');
const timeZone = require('moment-timezone');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const client = require('twilio')(config.twilioSID, config.twilioAuthToken);
const saltRounds = 10;
var pubnub = {};

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
      response[0].pubsub = decrypt(req.user.id, response[0].pubsub);
      response[0].pubpub = decrypt(req.user.id, response[0].pubpub);
      res.json(response);
    });
  },
  updateUser: (req, res, next) => {
    var data = req.body;
    db.read_user([req.user.name], (err, response) => {
      var userData = response[0];
      if (!data.pubsub || data.pubsub[0] === 's') {
        data.pubsub = encrypt(req.user.id, data.pubsub);
        data.pubpub = encrypt(req.user.id, data.pubpub);
      }
      db.update_user([req.user.id, data.name, data.email, data.phone, data.password, data.pubsub, data.pubpub, data.pubchan], (err, response) => {
        if (userData.pubsub === null || userData.pubpub === null) {
          data.pubsub = decrypt(req.user.id, data.pubsub);
          data.pubpub = decrypt(req.user.id, data.pubpub);
          pubnub[req.user.id] = new Pubnub({
            subscribeKey: data.pubsub,
            publishKey: data.pubpub,
            ssl: true
          });
          pubnub[req.user.id].addListener({
            message: message => {
              console.log("This is the message for id " + req.user.id + ":", message);
              db.read_device_id([message.message.nickname, req.user.id], (err, id) => {
                db.read_device_settings([id[0].sensor_id], (err, settings) => {
                  var alert = false;
                  var start = moment(settings[0].start_time);
                  var end = moment(settings[0].end_time);
                  var now = moment((message.timetoken / 10000));
                  if (settings[0].active) {
                    if (now.format('HH:mm') >= start.format('HH:mm') && now.format('HH:mm') <= end.format('HH:mm')) {
                      alert = true;
                      db.read_user([e.name], (err, response) => {
                        var email = response[0].email;
                        var phone = response[0].phone;
                        client.sendMessage({
                          to: phone,
                          from: '+18016236835',
                          body: `Your ${message.message.nickname} is ${message.message.status}!`
                        }); //end text alert
                        smtpTransport.sendMail({
                          from: `${YOUR_NAME} ${EMAIL_ACCOUNT_USER}`,
                          to: email,
                          subject: 'HomeOne Alert!',
                          text: `Your ${message.message.nickname} is ${message.message.status}!`
                        }, function(error, response) {
                          if (error) {
                            console.log(error);
                          } else {
                            console.log("Message sent");
                          }
                          smtpTransport.close();
                        }); //End Email alert
                      });
                    }
                  }
                  db.create_history([req.user.id, id[0].sensor_id, alert, false, message.message.status, now.format('YYYY-MM-DD HH:mm:ss')], (err, response) => {});
                });
              });
            },
            presence: presence => {
              console.log("This is the presence for id " + req.user.id + ":", presence);
            },
            status: status => {
              console.log("This is the status for id " + req.user.id + ":", status);
            }
          });

          pubnub[req.user.id].subscribe({
            channels: [data.pubchan],
            withPresence: true
          });

          res.send(200);
        } else {
          res.send(200);
        }
      });
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
    } else {
      res.status(500).send("No User data Provided");
    }
  },
  destroyUser: (req, res, next) => {
    db.destroy_user_settings([req.user.id], (err, response) => {
      db.destroy_user_sensors([req.user.id], (err, response) => {
        db.destroy_user([req.user.id], (err, response) => {
          if (err) {
            console.log(err);
            res.status(204).json('failure');
          }
          else {
            res.status(200);
          }
        });
      });
    });
  }
}; //End Export

var encrypt = (id, pub) => {
  var result = [];
  var key = id % 26;
  var text = pub;

  for (var i = 0; i < text.length; i++) {
    if (!/[^A-Za-z]/.test(text[i])) {
      if (text[i] === text[i].toUpperCase()) {
        cipher(text[i], key, 90, 26);
      } else if (text[i] === text[i].toLowerCase()) {
        cipher(text[i], key, 122, 26);
      }
    } else {
      result.push(text[i]);
    }
  }

  function cipher(char, key, wrap, alpha) {
    var cryptConvert = char.charCodeAt();
    cryptConvert += key;
    if (cryptConvert > wrap) {
      cryptConvert -= alpha;
    }
    result.push(String.fromCharCode(cryptConvert));
  }
  return result.join('');
};

var decrypt = (id, pub) => {
  var result = [];
  var key = id % 26;
  var text = pub;

  for (var i = 0; i < text.length; i++) {
    if (!/[^A-Za-z]/.test(text[i])) {
      if (text[i] === text[i].toUpperCase()) {
        cipher(text[i], key, 65, 26);
      } else if (text[i] === text[i].toLowerCase()) {
        cipher(text[i], key, 97, 26);
      }
    } else {
      result.push(text[i]);
    }
  }

  function cipher(char, key, wrap, alpha) {
    var cryptConvert = char.charCodeAt();
    cryptConvert -= key;
    if (cryptConvert < wrap) {
      cryptConvert += alpha;
    }
    result.push(String.fromCharCode(cryptConvert));
  }
  return result.join('');
};
