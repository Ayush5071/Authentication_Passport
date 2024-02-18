var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"Ayush12@"
}));
//allowing server for sessions
app.use(session({
  resave : false,
  saveUninitialized:false,
  secret:"hello bye byee"
}));
//passport get ready for authentication authorization to perform 
app.use(passport.initialize());
//opening the module session of passport to open through which it can save the data of that particular session 
app.use(passport.session())
//checking and serializing the user,there hashing will get performed
passport.serializeUser(usersRouter.serializeUser());

passport.deserializeUser(usersRouter.deserializeUser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
