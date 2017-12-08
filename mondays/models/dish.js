const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    title: String,
    description: String,
    coast: Number
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;