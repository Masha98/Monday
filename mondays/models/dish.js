const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    title: String,
    description: String,
    coast: Number
});

const Events = MongooseTrigger(DishSchema);

Events.on('create', data => console.log('[create] new:', data));
Events.on('update', data => console.log('[update] new:', data));
Events.on('remove', data => console.log('[remove] new:', data));

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;