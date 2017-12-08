const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    details: String,
    url: String,
    date: {type: Date, default: Date.now}
});

const News = mongoose.model('News', newsSchema);

module.exports = News;