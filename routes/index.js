var express = require('express');
var router = express.Router();
var Login = require('../controllers/Login');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', Login.login);

module.exports = router;
