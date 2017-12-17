const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');
const entityController = require('../controllers/EntityController');
const controller = new entityController(Orders);


router.get('/orders',(req, res, next) => {
    let limit = 5   ;
    let offset = 0;
    let sort = 'desc';

    if(req.query.limit){
        limit = req.query.limit;
    }

    if(req.query.offset){
        offset = req.query.offset;
    }

    if(req.query.sort){
        sort = req.query.sort;
    }

    Orders
        .find({})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({create_date: sort})
        .exec()
        .then((orders) => {
            res.json(orders);
        });
});

router.get('/orders/:id',(req, res, next) => {
    controller.getEntityById(req.params.id, (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/orders',(req, res, next) => {
    const newOrders = Orders({
        name: req.body.name,
        surname: req.body.surname,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        dishes: req.body.dishes
    });

    controller.addEntity(newOrders, (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/orders/:id',(req, res, next) => {
    controller.deleteEntity(req.params.id, (err) => {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/orders/:id',(req, res, next) => {
    const orders = {
        _id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        dishes: req.body.dishes
    };
    controller.updateEntity(orders, (err, _entity) => {
        if(err) res.send(err);
        res.json(_entity);
    });
});

router.post('/orders/all-sum',(req, res, next) => {
    const newOrders = Orders({
        name: req.body.name,
        surname: req.body.surname,
        last_name: req.body.last_name,
        phone: req.body.phone,
        address: req.body.address,
        dishes: req.body.dishes
    });

    newOrders
        .totalSum()
        .then((total) => {
            res.json(total[0]);
        })
});

module.exports = router;