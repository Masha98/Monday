const mongoose = require('mongoose');
const Dish = require('./dish');
const Schema = mongoose.Schema;
const MongooseTrigger = require('mongoose-trigger');

const ordersSchema = new Schema({
    name: String,
    surname: String,
    last_name: String,
    phone: String,
    address: String,
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
    total: Number
});

const Events = MongooseTrigger(ordersSchema);

ordersSchema.methods.totalSum = function() {
    return Dish.aggregate([
            {
                $match: {
                    "_id" : {
                        $in: this.dishes
                    }
                },
            },
            {
                $group: {
                    _id: 'null',
                    total: {
                        $sum: '$coast'
                    }
                }
            },
            {
                $project: { _id: false, total: true }
            }
        ])
        .exec();
};

const Orders = mongoose.model('Orders', ordersSchema);

Events.on('create', data => {
    Orders
        .findOne({ _id: data._id })
        .exec()
        .then((data) => {
            return data
                .totalSum()
                .then((total) => {
                    data.total = total[0].total;
                    return data.save().exec();
                });
        })
        .then(console.log);
});

Events.on('update', data => console.log('[update] new:', data));
Events.on('remove', data => console.log('[remove] new:', data));



module.exports = Orders;
