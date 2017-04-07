var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let token = req.cookies.token
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.render('index', { title: 'Express' });
    }

    res.render('dashboard', { username: payload });
  });
});

module.exports = router;
