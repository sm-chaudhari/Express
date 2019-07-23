var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../controllers/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', Users.createUser);
router.get('/get', Users.getUsers);
router.get('/get/:firstname', Users.getUser);
router.put('/update/:id', Users.updateUser);
router.delete('/remove/:id', Users.removeUser);

module.exports = router;
