const Orders = require('../models/orders');
const EntityController = require('../controllers/EntityController');
const controller = new EntityController(Orders);

module.exports = function (req, res, next) {
    console.log(new Date(req.query.date_gt));
    console.log(new Date(req.query.date_lt));
    Orders
        .aggregate([
            {
                $match: {
                    "create_date": {
                        $gt: new Date(req.query.date_gt),
                        $lt: new Date(req.query.date_lt),
                    }
                }
            }
        ])
        .exec()
        .then((orders) => {
            console.log(orders);
            // res.json({ orders });
            res.xls('DataBase.xlsx', orders)
        })
        .catch(console.log);
    // controller.getEntity(function(err, models) {
    //     res.xls('DataBase.xlsx', models)
    // });
};