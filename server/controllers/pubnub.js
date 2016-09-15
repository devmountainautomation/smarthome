const app = require('../index.js');
const Pubnub = require('pubnub');
const moment = require('moment');
const jstz = require('jstz');
const timeZone = require('moment-timezone');
const config = require('../config/config.js');
const db = app.get('db');
const nodemailer = require('nodemailer');
const client = require('twilio')(config.twilioSID, config.twilioAuthToken);

const EMAIL_ACCOUNT_USER = config.emailAccountUser;
const EMAIL_ACCOUNT_PASSWORD = config.emailPassword;
const YOUR_NAME = config.emailName;

var smtpTransport = nodemailer.createTransport({
  service: "gmail", // sets automatically host, port and connection security settings
  auth: {
    user: EMAIL_ACCOUNT_USER,
    pass: EMAIL_ACCOUNT_PASSWORD
  }
});

smtpTransport.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

//************************* Don't Delete this!! ***********************//

(() => {
  db.get_all_users([], (err, users) => {
    var pubnub = {};
    users.forEach((e) => {
      pubnub[e.id] = new Pubnub({
        subscribeKey: e.pubsub,
        publishKey: e.pubpub,
        ssl: true
      });

      pubnub[e.id].addListener({
        message: message => {
          console.log("This is the message for id " + e.id + ":", message);
          db.read_device_id([message.message.nickname, e.id], (err, id) => {
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
                    // client.sendMessage({
                    //   to: phone,
                    //   from: '+18016236835',
                    //   body: `Your ${message.message.nickname} is ${message.message.status}!`
                    // }); //end text alert
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
              db.create_history([e.id, id[0].sensor_id, alert, false, message.message.status, now.format('YYYY-MM-DD HH:mm:ss')], (err, response) => {});
            });
          });
        },
        presence: presence => {
          console.log("This is the presence for id " + e.id + ":", presence);
        },
        status: status => {
          console.log("This is the status for id " + e.id + ":", status);
        }
      });

      pubnub[e.id].subscribe({
        channels: [e.pubchan],
        withPresence: true
      });
    });
    module.exports = pubnub;
  });
})();

// var messages = [];
// for (var i = 0; i < req.body.to.length; i++) {
//   client.sendMessage({
//     to: req.body.to[i],
//     from: req.body.from,
//     body: req.body.message
//   }, function(err, message) {
//     if (err) {
//       res.send(err);
//     } else {
//       messages.push(message);
//     }
//   });
// }

// smtpTransport.sendMail({ //email options
//   from: YOUR_NAME + " " + EMAIL_ACCOUNT_USER, // sender address.  Must be the same as authenticated user if using GMail.
//   to: req.body.toField, // receiver
//   subject: req.body.subjectField, // subject
//   text: req.body.textField // body
// }, function(error, response) { //callback
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Message sent: " + response.message);
//     res.send("email sent");
//   }
//   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
// });

// var pubnub = new Pubnub({
//   subscribeKey: config.SubscribeKey,
//   publishKey: config.PublishKey,
//   // secretKey: config.SecretKey,
//   ssl: true
// });
//
// pubnub.addListener({
//   message: message => {
//     console.log("This is the message:", message);
//   },
//   presence: presence => {
//     console.log("This is the presence:", presence);
//   },
//   status: status => {
//     console.log("This is the status:", status);
//   }
// });
//
// pubnub.subscribe({
//   channels: ['my_channel'],
//   withPresence: true
// });
//
// module.exports = pubnub;
