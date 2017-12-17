const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const entityController = require('../controllers/EntityController');
const controller = new entityController(Dish);


router.get('/dish', (req, res, next) => {
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

    Dish
        .find({})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({create_date: sort})
        .exec()
        .then((orders) => {
            res.json(orders);
        });
});

router.get('/dish/:id', (req, res, next) => {
    controller.getEntityById(req.params.id,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/dish', (req, res, next) => {
    const newDish = Dish({
        title: req.body.title,
        description: req.body.description,
        coast: req.body.coast
    });

    controller.addEntity(newDish,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/dish/:id', (req, res, next) => {
    controller.deleteEntity(req.params.id,  (err) => {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/dish/:id', (req, res, next) => {
    const dish = {
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        coast: req.body.coast
    };

    controller.updateEntity(dish,  (err, _entity) => {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;