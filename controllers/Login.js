let jwt = require('jsonwebtoken');
let config = require('../config');
var mongoose = require('mongoose');
var usersSchema = require('../helpers/Users');
const bcrypt = require('bcrypt');

exports.login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';
    console.log("Username", username);

    if (username && password) {
        console.log(username);
        usersSchema.findOne({ email: username }, function (err, userInfo) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Incorrect username or password',
                    data: err
                });
            } else {
                if (userInfo) {
                    if (bcrypt.compareSync(password, userInfo.password)) {
                        var userData = userInfo.toJSON();
                        const token = jwt.sign({ id: userData._id }, config.secret, { expiresIn: '24h' });
                        delete userData.password;
                        res.json({
                            status: "success",
                            message: "Authentication successful!ser found!!!",
                            data: { user: userData, token: token }
                        });
                    } else {
                        res.json({ status: "error", message: "Invalid password!" });
                    }
                } else {
                    res.json({ status: "error", message: "Invalid email!" });
                }
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }

    // if (username && password) {
    //     if (username === mockedUsername && password === mockedPassword) {
    //         let token = jwt.sign({ username: username },
    //             config.secret,
    //             {
    //                 expiresIn: '24h' // expires in 24 hours
    //             }
    //         );
    //         // return the JWT token for the future API calls
    //         res.json({
    //             success: true,
    //             message: 'Authentication successful!',
    //             token: token
    //         });
    //     } else {
    //         res.json({
    //             success: false,
    //             message: 'Incorrect username or password'
    //         });
    //     }
    // } else {
    //     res.json({
    //         success: false,
    //         message: 'Authentication failed! Please check the request'
    //     });
    // }
}