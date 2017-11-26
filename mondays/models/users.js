var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    password: String
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
