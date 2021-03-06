const express = require('express');
const router = express.Router();
const News = require('../models/news');
const entityController = require('../controllers/EntityController');
const controller = new entityController(News);


router.get('/news', (req, res, next) => {
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

    News
        .find({})
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({create_date: sort})
        .exec()
        .then((orders) => {
            res.json(orders);
        });
});

router.get('/news/:id', (req, res, next) => {
    controller.getEntityById(req.params.id,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.post('/news', (req, res, next) => {
    const newNews = News({
        title: req.body.title,
        details: req.body.details,
        url: req.body.url,
        date: req.body.date
    });

    controller.addEntity(newNews,  (err, entity) => {
        if(err) res.send(err);
        res.json(entity);
    });
});

router.delete('/news/:id', (req, res, next) => {
    controller.deleteEntity(req.params.id,  (err) => {
        if(err) res.send(err);
        res.json('OK!');
    });
});

router.put('/news/:id', (req, res, next) => {
    const news = {
        _id: req.params.id,
        title: req.body.title,
        details: req.body.details,
        url: req.body.url
    };

    controller.updateEntity(news,  (err, _entity) => {
        if(err) res.send(err);
        res.json(_entity);
    });
});

module.exports = router;