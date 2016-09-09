const app = require('../index.js')
const Pubnub = require('pubnub');
const config = require('../config/config.js');
const db = app.get('db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//************************* Don't Delete this!! ***********************//

// (() => {
//   db.get_all_users([], (err, users) => {
//     users.forEach((e) => {
//       pubnub = {};
//       pubnub[e.id] = new Pubnub({
//         subscribeKey: e.pubsub,
//         publishKey: e.pubpub,
//         ssl: true
//       });
//
//       pubnub[e.id].addListener({
//         message: message => {
//           console.log("This is the message for id " + e.id + ":", message);
//         },
//         presence: presence => {
//           console.log("This is the presence for id " + e.id + ":", presence);
//         },
//         status: status => {
//           console.log("This is the status for id " + e.id + ":", status);
//         }
//       });
//
//       pubnub[e.id].subscribe({
//         channels: [e.pubchan],
//         withPresence: true
//       });
//     });
//     module.exports = pubnub;
//   });
// })();

var pubnub = new Pubnub({
  subscribeKey: config.SubscribeKey,
  publishKey: config.PublishKey,
  // secretKey: config.SecretKey,
  ssl: true
});

pubnub.addListener({
  message: message => {
    console.log("This is the message:", message);
  },
  presence: presence => {
    console.log("This is the presence:", presence);
  },
  status: status => {
    console.log("This is the status:", status);
  }
});

pubnub.subscribe({
  channels: ['my_channel'],
  withPresence: true
});

module.exports = pubnub;
