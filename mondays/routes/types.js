const express = require('express');
const router = express.Router();
const Type = require('../models/type');
const entityController = require('../controllers/EntityController');
const controller = new entityController(Type);


router.get('/type', (req, res, next) => {
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

    Type
        .find({})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({create_date: sort})
        .exec()
        .then((orders) => {
            res.json(orders);
        });
});

router.get('/type/:id', (req, res, next) => {
    controller.getEntityById(req.params.id,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/type', (req, res, next) => {
    const newType = Type({
        type: req.body.type,
    });

    controller.addEntity(newType,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/type/:id', (req, res, next) => {
    controller.deleteEntity(req.params.id,  (err) => {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/type/:id', (req, res, next) => {
    const dish = {
        _id: req.params.id,
        type: req.body.type,
    };

    controller.updateEntity(dish,  (err, _entity) => {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;