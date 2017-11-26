var News = require('../models/news');
var NewsController = function () {};
NewsController.prototype.getNews = getNews;
NewsController.prototype.getNewsById = getNewsById;
NewsController.prototype.addNews = addNews;
NewsController.prototype.deleteNews = deleteNews;
NewsController.prototype.updateNews = updateNews;

function getNews(call) {
    News.find({}, function (err, news) {
        if (err) {
            call(err, null);
        } else {
            call(null, news);
        }
    });
}

function getNewsById(id, call) {
    News.findById(id, function(err, news) {
        if (err) {
            call(err, null);
        } else {
            call(null, news);
        }
    });
}

function addNews(newNews, call) {
    newNews.save(function(err) {
        if (err){
            call(err, null);
        }else{
            call((null, newNews));
        }
    });
}

function deleteNews(call) {
    News.findByIdAndRemove(req.params.id, function(err) {
        if (err){
            call(err);
        }else{
            call(null);
        }
    });
}

function updateNews(_news, call) {
    News.findById(_news.id, function(err, news) {
        if (err){
            call(err, null);
        }else {
            news.save(function (err) {
                if (err) {
                    call(err, null);
                } else {
                    call(null, news);
                }
            });
        }
    });
}

module.exports = NewsController;