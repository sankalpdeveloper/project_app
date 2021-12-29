const createError = require('http-errors');
const express = require('express');
// const fileupload = require('express-fileupload') 
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
require('dotenv').config();
const ejs = require('ejs')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const fileConversionRouter = require('./routes/fileConversion')
const db = require('./connection/db')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var cors = require('cors');
app.use(logger('dev'));
// app.use(fileUpload());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/filesconversion',fileConversionRouter)
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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
module.exports = app;