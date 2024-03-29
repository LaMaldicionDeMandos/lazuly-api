const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

const landing = require('./routes/landing');
const login = require('./routes/login');
const users = require('./routes/users');
const roles = require('./routes/roles');
const profiles = require('./routes/profiles');

const app = express();

app.use(cors()).options('*', cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUploader({limits: { fileSize: config.get('file_max_size') }, abortOnLimit: true }));

app.use('/landing', landing);
app.use('/', login);
app.use('/users', users);
app.use('/roles', roles);
app.use('/profiles', profiles);

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
});

module.exports = app;
