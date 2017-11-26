var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: String,
    details: String,
    url: String,
    date: {type: Date, default: Date.now}
});

var News = mongoose.model('News', newsSchema);

module.exports = News;