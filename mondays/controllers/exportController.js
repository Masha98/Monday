var Orders = require('../models/orders');
var entityController = require('../controllers/EntityController')();
var controller = new entityController(Orders);

module.exports = function (req, res, next) {
    controller.getEntity(function(err, models) {
        res.xls('DataBase.xlsx', models)
    });
};