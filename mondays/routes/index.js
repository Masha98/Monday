const express = require('express');
const router = express.Router();
const News = require('../models/news');
const Dish = require('../models/dish');
const EntityController = require('../controllers/EntityController');
const NewsController = new EntityController(News);
const DishController = new EntityController(Dish);
const exportController = require('../controllers/exportController');
const mongoose = require('mongoose');
const json2xls = require('json2xls');

router.get('/', (req, res) => {
    NewsController.getEntity( (err, news) => {
        if(err) res.send(err);
        res.render('index', {
            news
        });
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/gallery', (req, res) => {
    res.render('gallery');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/order', (req, res) => {
    DishController.getEntity((err, dish) => {
        if(err) res.send(err);
        res.render('order', { dish } );
    })

});

router.get('/detail/:id', (req, res) => {
    NewsController.getEntityById(req.params.id, (err, news) => {
        if(err) res.send(err);
        res.render('detail', news);
    });
});

router.get('/export-db', exportController);

module.exports = router;
