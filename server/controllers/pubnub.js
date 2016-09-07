const app = require('../index.js')
const Pubnub = require('pubnub');
const config = require('../config/config.js');
const db = app.get('db');

var pubnub = new Pubnub({
  subscribeKey: config.SubscribeKey,
  publishKey: config.PublishKey,
  secretKey: config.SecretKey,
  ssl: true
});

pubnub.addListener({
  message: function(message) {
    console.log("This is the message:", message);
  },
  presence: function(presence) {
    console.log("This is the presence:", presence);
  },
  status: function(status) {
    console.log("This is the status:", status);
  }
});

pubnub.subscribe({
  channels: ['my_channel'],
  withPresence: true
});

module.exports = pubnub;
