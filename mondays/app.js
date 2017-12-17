const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const json2xls = require('json2xls');
const session = require('express-session');
const passport = require('passport');
const mongoConnect = require('connect-mongo');

const index = require('./routes/index');
const news = require('./routes/news');
const orders = require('./routes/orders');
const users = require('./routes/users');
const dishes = require('./routes/dishes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(json2xls.middleware);

const mongooseInstance = mongoose.connect('mongodb://localhost/menu');
const coonnectToStore = mongoConnect(session);
const MongoStore = new coonnectToStore({ mongooseConnection: mongooseInstance.connection });

const SECRET_KEY = 'mySession';
app.use(session({
    secret: SECRET_KEY,
    store: MongoStore
}));

app.use(passport.initialize());
app.use(passport.session());

//Passport config
const passportConfig = require("./config/passport");
passportConfig(passport);
app.post('/login', passport.authenticate('login',{
    successRedirect: '/main',
    failureRedirect: '/main'
}));

app.get('/signup', (req,res) => {
    req.session.user = null;
    req.logout();
    res.redirect('/');
});

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
