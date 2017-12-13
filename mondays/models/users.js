const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    password: String
});

const Events = MongooseTrigger(usersSchema);

Events.on('create', data => console.log('[create] new:', data));
Events.on('update', data => console.log('[update] new:', data));
Events.on('remove', data => console.log('[remove] new:', data));

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
