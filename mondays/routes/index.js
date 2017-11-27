var express = require('express');
var router = express.Router();
var newsController = require('../controllers/newsController');
var controller = new newsController();
var exportController = require('../controllers/exportController');
var json2xls = require('json2xls');

router.get('/', function(req, res, next) {
    controller.getNews(function (err, news) {
        if(err) res.send(err);
        res.render('index', {
            news: news
        });
    });
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/gallery', function(req, res, next) {
    res.render('gallery');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/order', function(req, res, next) {
    res.render('order');
});

router.get('/detail/:id', function(req, res, next) {
    controller.getNewsById(req.params.id, function (err, news) {
        if(err) res.send(err);
        res.render('detail', news);
    });
});

router.get('/export-db', exportController);

module.exports = router;
