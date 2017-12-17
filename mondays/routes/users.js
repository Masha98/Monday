const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const entityController = require('../controllers/EntityController');
const controller = new entityController(Users);


router.get('/users', (req, res, next) => {
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

    Users
        .find({})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({create_date: sort})
        .exec()
        .then((orders) => {
            res.json(orders);
        });
});

router.get('/users/:id', (req, res, next) => {
    controller.getEntityById(req.params.id,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/users', (req, res, next) => {
    const newUsers = Users({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.password
    });

    controller.addEntity(newUsers,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/users/:id', (req, res, next) => {
    controller.deleteEntity(req.params.id,  (err) => {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/users/:id', (req, res, next) => {
    const users = {
        _id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.password
    };
    controller.updateEntity(users,  (err, _entity) => {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;