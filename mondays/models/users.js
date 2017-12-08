const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    password: String
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
