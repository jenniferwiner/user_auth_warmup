const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom')
const bcrypt = require('bcrypt');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.post('/', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return next(boom.create(400, 'You must enter an username and password'))
  }

  knex('users')
    .where('username', username)
    .then(user => {
      if (user.length !== 0) {
        return next(boom.create(400, 'That username already exists'));
      }
      bcrypt.hash(password, 12)
        .then(hashed_password => {
          return knex('users')
            .insert({ username, hashed_password }, '*')
            .then(insertedUser => {
              res.render('users', { username });
            });
        });
    })
    .catch(err => {
      throw err;
    });
});

module.exports = router;
