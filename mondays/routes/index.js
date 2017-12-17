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

router.get('/main',(req, res) => {
    console.log('User', req.user);
    NewsController.getEntity( (err, news) => {
        if(err) res.send(err);
        res.render('index', {
            news,
            isAuth: !req.user,
            signOut: !!req.user,
        });
    });
});

router.get('/', (req, res) => {
    console.log('User', req.user);
    NewsController.getEntity( (err, news) => {
        if(err) res.send(err);
        res.render('index', {
            news,
            isAuth: !req.user,
            signOut: !!req.user,
        });
    });
});

router.get('/about', (req, res) => {
    console.log('User', req.user);
    res.render('about', {
        isAuth: !req.user,
        signOut: !!req.user,
    });
});

router.get('/gallery', (req, res) => {
    console.log('User', req.user);
    res.render('gallery', {
        isAuth: !req.user,
        signOut: !!req.user,
    });
});

router.get('/login', (req, res) => {
    console.log('User', req.user);
    res.render('login', {
        isAuth: !req.user,
        signOut: !!req.user,
    });
});

router.get('/order', (req, res) => {
    console.log('User', req.user);
    DishController.getEntity((err, dish) => {
        if(err) res.send(err);
        res.render('order', { dish, isAuth: !req.user, signOut: !!req.user} );
    })

});

router.get('/detail/:id', (req, res) => {
    console.log('User', req.user);
    NewsController.getEntityById(req.params.id, (err, news) => {
        if(err) res.send(err);
        res.render('detail', { news, isAuth: !req.user, signOut: !!req.user});
    });
});

router.get('/export-db', exportController);

module.exports = router;
