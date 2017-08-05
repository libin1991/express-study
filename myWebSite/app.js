var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);  //需要在session的下面
var ejs = require('ejs');
var router=require('./routes');
var config = require('./config');

// 静态文件目录
var staticDir = path.join(__dirname,'/public');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(staticDir));

// session 设置
app.use(session({
    name:config.name,
    secret:config.session_secret,
    store:new MongoStore({
      url:config.mongodb  // 用来保存数据库的一些session，比如记住登录密码等
    }),
    cookie:{
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      signed: true, httpOnly: true
    }, //cookie 有效期30天,
	  resave:true,
	  saveUninitialized:true
}))

// routes
app.use('/',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
