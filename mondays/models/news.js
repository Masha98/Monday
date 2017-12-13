const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    details: String,
    url: String,
    date: {type: Date, default: Date.now}
});

const Events = MongooseTrigger(newsSchema);

Events.on('create', data => console.log('[create] new:', data));
Events.on('update', data => console.log('[update] new:', data));
Events.on('remove', data => console.log('[remove] new:', data));

const News = mongoose.model('News', newsSchema);

module.exports = News;