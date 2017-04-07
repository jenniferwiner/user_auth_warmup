var express = require('express');
var router = express.Router();
var knex = require('../knex');
const bcrypt = require('bcrypt');
const boom = require('boom');
const jwt = require('jsonwebtoken');

/* GET session page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  let username = req.body.username;
  let plain_password = req.body.password;

  // error handling
  if (!username || !plain_password) {
    return next(boom.create(400));
  }

  knex('users')
    .where('username', username)
    .then(users => {
      if (users.length === 0) {
        return next(boom.create(401))
      }
      let user = users[0]
      bcrypt.compare(plain_password, user.hashed_password)
        .then(result => {
          if (!result) {
            return next(boom.create(401));
          }

          let token = jwt.sign({ user: user }, process.env.JWT_KEY)
          res.cookie("token", token);

          res.render('dashboard', { username })
        })
    });
});

module.exports = router;
