const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const json2xls = require('json2xls');

const index = require('./routes/index');
const news = require('./routes/news');
const orders = require('./routes/orders');
const users = require('./routes/users');
const dishes = require('./routes/dishes');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/menu');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(json2xls.middleware);

app.use('/', index);
app.use('/api', news);
app.use('/api', orders);
app.use('/api', users);
app.use('/api', dishes);


app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
