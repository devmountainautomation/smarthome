const app = require('../index.js');
const Pubnub = require('pubnub');
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
            db.read_device_settings([id], (err, settings) => {
                var alertTime = timeConverter(message.timetoken / 10000000);
                console.log(alertTime);
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

var timeConverter = time => {
    var a = new Date(time * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var minutes = a.getMinutes();
    var seconds = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    return time;
};
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
