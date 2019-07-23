var mongoose = require('mongoose');
var usersSchema = require('../model/Users');


usersSchema.statics = {
    create: function (data, cb) {
        var user = new this(data);
        console.log('user', user);
        console.log('data', data);
        user.save(cb);
    },

    get: function (query, cb) {
        this.find(query, cb);
    },

    getByFirstname: function (query, cb) {
        this.find(query, cb);
    },
    getByLastname: function (query, cb) {
        this.find(query, cb);
    },
    getByEmail: function (query, cb) {
        this.find(query, cb);
    },

    update: function (query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function (query, cb) {
        this.findOneAndDelete(query, cb);
    }
}

var usersModel = mongoose.model('Users', usersSchema);
module.exports = usersModel;
