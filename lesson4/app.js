var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);  //需要在session的下面
var ejs = require('ejs');
var router=require('./routes');
var config = require('./config');
var local = require('./middlewares/locals').flash;  //这里面使用全局的session,这样的话就可以将登陆信息返回到公共头部

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
app.use(bodyParser.urlencoded({ extended: false }));
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
}));
app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024  // 10MB
  }
}));

// 接口支持跨域访问
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type=application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true) //支持跨域传cookie
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method == 'OPTIONS') {
    console.log('option');
    //res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
});


// routes
app.use(local);    // 使用必须在router之前
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
