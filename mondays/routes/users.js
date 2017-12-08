const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const entityController = require('../controllers/EntityController');
const controller = new entityController(Users);


router.get('/users', (req, res, next) => {
    controller.getEntity( (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
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