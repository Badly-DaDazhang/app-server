var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/file')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
  // 例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
  // express.static(root, [options])
  // __dirname 绝对路径 此处为/Users/badly./Desktop/more-serve/myapp
  
  如果要使用多个静态资源目录，请多次调用 express.static 中间件函数：
  app.use(express.static('public'))
  app.use(express.static('files'))
  访问静态资源文件时，express.static 中间件函数会根据目录的添加顺序查找所需的文件。

  app.use('/static', express.static(path.join(__dirname, 'public')))
  了解更多关于 serve-static 函数及其参数的知识，请参考 serve-static。
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', fileRouter);

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
