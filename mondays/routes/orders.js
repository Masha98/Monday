var express = require('express');
var router = express.Router();
var Orders = require('../models/orders');
var entityController = require('../controllers/EntityController')();
var controller = new entityController(Orders);


router.get('/orders', function(req, res, next) {
    controller.getEntity(function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.get('/orders/:id', function(req, res, next) {
    controller.getEntityById(req.params.id, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/orders', function(req, res, next) {
    var newOrders = Orders({
        name: req.body.name,
        surname: req.body.surname,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        menu: req.body.menu
    });

    controller.addEntity(newOrders, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/orders/:id', function(req, res, next) {
    controller.deleteEntity(req.params.id, function (err) {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/orders/:id', function(req, res, next) {
    var orders = {
        _id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        menu: req.body.menu
    };
    controller.updateEntity(orders, function (err, _entity) {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;