const app = require('./../index.js');
const Pubnub = require('pubnub');
const moment = require('moment');
const jstz = require('jstz');
const timeZone = require('moment-timezone');
const config = require('../config/config.js');
const data = app.get('db');
const nodemailer = require('nodemailer');
const client = require('twilio')(config.twilioSID, config.twilioAuthToken);
const users = require('./userCtrl.js');

const EMAIL_ACCOUNT_USER = config.emailAccountUser;
const EMAIL_ACCOUNT_PASSWORD = config.emailPassword;
const YOUR_NAME = config.emailName;

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ACCOUNT_USER,
    pass: EMAIL_ACCOUNT_PASSWORD
  }
});


(() => {
  data.get_all_users([], (err, users) => {
    var pubnub = {};
    users.forEach((e) => {
      e.pubsub = decrypt(e.id, e.pubsub);
      e.pubpub = decrypt(e.id, e.pubpub);
      pubnub[e.id] = new Pubnub({
        subscribeKey: e.pubsub,
        publishKey: e.pubpub,
        ssl: true
      });

      pubnub[e.id].addListener({
        message: message => {
          console.log("This is the message for id " + e.id + ":", message);

          data.read_device_id([message.message.nickname, e.id], (err, id) => {
            data.read_device_settings([id[0].sensor_id], (err, settings) => {
              var alert = false;
              var start = moment(settings[0].start_time);
              var end = moment(settings[0].end_time);
              var now = moment((message.timetoken / 10000));
              if (settings[0].active) {
                if (now.format('HH:mm') >= start.format('HH:mm') && now.format('HH:mm') <= end.format('HH:mm')) {
                  alert = true;
                  data.read_user([e.name], (err, response) => {
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
              data.create_history([e.id, id[0].sensor_id, alert, false, message.message.status, now.format('YYYY-MM-DD HH:mm:ss')], (err, response) => {});
            });
          });
        },
        presence: presence => {
          console.log("This is the presence for id " + e.id + ":", presence);
        },
        status: status => {
          console.log("This is the status for id " + e.id + ":", status);
          if (status.error === true && status.operation !== 'PNHeartbeatOperation') {
            client.sendMessage({
              to: '+18013690655',
              from: '+18016236835',
              body: `Pubnub is broken for user ${e.id}!`
            });
          }
        }
      });

      pubnub[e.id].subscribe({
        channels: [e.pubchan],
        // withPresence: true
      });
      module.exports = pubnub;
    });
  });
})();

// module.exports = {
//         destroyListener: (id, chan) => {
//             if (pubnub[id]) {
//                 pubnub[id].unsubscribe(chan);
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }
// };

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
