var Users = require('../helpers/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.createUser = function (req, res, next) {
    console.log('req', req.body);
    var user = {
        firstname: req.body[0].firstname,
        lastname: req.body[0].lastname,
        email: req.body[0].email,
        password: req.body[0].password
    };
    // console.log('user', user);

    Users.create(user, function (err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "User created successfully"
        })
    })
}

exports.getUsers = function (req, res, next) {
    Users.get({}, function (err, users) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.getUser = function (req, res, next) {
    Users.get({ firtname: req.params.firstname }, function (err, users) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

exports.updateUser = function (req, res, next) {
    var user = {
        firstname: req.body[0].firstname,
        lastname: req.body[0].lastname,
        email: req.body[0].email,
        password: bcrypt.hashSync(req.body[0].password, saltRounds)
    };

    Users.update({ _id: req.params.id }, user, function (err, user) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "User updated successfully"
        })
    })
}

exports.removeUser = function (req, res, next) {
    Users.delete({ _id: req.params.id }, function (err, user) {
        console.log("user", user);
        if (err) {
            res.json({
                error: err
            })
        } else {
            if (user) {
                res.json({
                    message: "User deleted successfully"
                })
            } else {
                res.json({
                    message: "Invalid ID"
                })
            }
        }
    })
}