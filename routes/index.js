var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let token = req.cookies.token
  if (!token) {
    res.render('index', {
      title: 'Express'
    });
  }
  else {
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        console.log(err);
      }
      console.log(payload);
      res.render('dashboard', {
        username: payload.username
      });
    });
  }

});

router.get('/logout', (req, res, next) => {
  res.clearCookie('token');
  res.redirect('/');
})

module.exports = router;
