const Orders = require('../models/orders');
const EntityController = require('../controllers/EntityController');
const controller = new EntityController(Orders);

module.exports = function (req, res, next) {
    controller.getEntity(function(err, models) {
        res.xls('DataBase.xlsx', models)
    });
};