const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongooseTrigger = require('mongoose-trigger');

const typeSchema = new Schema({
    type: String,
    permission: {
        order: Boolean,
        export: Boolean,
    }
});

const Events = MongooseTrigger(typeSchema);

Events.on('create', data => console.log('[create] new:', data));
Events.on('update', data => console.log('[update] new:', data));
Events.on('remove', data => console.log('[remove] new:', data));

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
