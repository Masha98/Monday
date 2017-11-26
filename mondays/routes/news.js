var express = require('express');
var router = express.Router();
var News = require('../models/news');
var entityController = require('../controllers/EntityController')();
var controller = new entityController(News);


router.get('/news', function(req, res, next) {
    controller.getEntity(function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.get('/news/:id', function(req, res, next) {
    controller.getEntityById(req.params.id, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/news', function(req, res, next) {
    var newNews = News({
        title: req.body.title,
        details: req.body.details,
        url: req.body.url,
        date: req.body.date
    });

    controller.addEntity(newNews, function (err, entity) {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/news/:id', function(req, res, next) {
    controller.deleteEntity(req.params.id, function (err) {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/news/:id', function(req, res, next) {
    var news = {
        _id: req.params.id,
        title: req.body.title,
        details: req.body.details,
        url: req.body.url
    };

    controller.updateEntity(news, function (err, _entity) {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;