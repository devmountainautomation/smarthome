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
    db.read_user([req.user.name], (err, response) => {
      response[0].pubsub = decrypt(req.user.id, response[0].pubsub);
      response[0].pubpub = decrypt(req.user.id, response[0].pubpub);
      res.json(response);
    });
  },
  updateUser: (req, res, next) => {
    var data = req.body;
    data.pubsub = encrypt(req.user.id, data.pubsub);
    data.pubpub = encrypt(req.user.id, data.pubpub);
    db.update_user([req.user.id, data.name, data.email, data.phone, data.password, data.pubsub, data.pubpub, data.pubchan], (err, response) => {
      if (err) {
        res.status(500).send("Update Failed");
      } else {
        res.sendStatus(200);
      }
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
