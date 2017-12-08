const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    name: String,
    surname: String,
    last_name: String,
    phone: String,
    address: String,
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
