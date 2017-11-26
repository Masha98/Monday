var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var entityController = require('../controllers/EntityController')();
var controller = new entityController(Users);


router.get('/users', function(req, res, next) {
    controller.getEntity(function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.get('/users/:id', function(req, res, next) {
    controller.getEntityById(req.params.id, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/users', function(req, res, next) {
    var newUsers = Users({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.password
    });

    controller.addEntity(newUsers, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/users/:id', function(req, res, next) {
    controller.deleteEntity(req.params.id, function (err) {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/users/:id', function(req, res, next) {
    var users = {
        _id: req.params.id,
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.password
    };
    controller.updateEntity(users, function (err, _entity) {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;