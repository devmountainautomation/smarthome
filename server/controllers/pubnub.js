const app = require('../index.js');
const Pubnub = require('pubnub');
const moment = require('moment');
const jstz = require('jstz');
const timeZone = require('moment-timezone');
const config = require('../config/config.js');
const db = app.get('db');

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
            db.read_device_settings([id[0].id], (err, settings) => {
              var alert = false;
              var start = moment(settings[0].start_time);
              var end = moment(settings[0].end_time);
              var now = moment((message.timetoken / 10000));
              if (settings[0].active) {
                if (now.format('HH:mm') >= start.format('HH:mm') && now.format('HH:mm') <= end.format('HH:mm')) {
                  alert = true;
                }
              }
              db.create_history([e.id, id[0].id, alert, false, message.message.status, now.format('YYYY-MM-DD HH:mm:ss')], (err, response) => {});
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


// var pubnub = new Pubnub({
//   subscribeKey: config.SubscribeKey,
//   publishKey: config.PublishKey,
//   // secretKey: config.SecretKey,
//   ssl: true
// });

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
