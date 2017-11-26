var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
    name: String,
    surname: String,
    last_name: String,
    phone: String,
    address: String,
    menu: String
});

var Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
