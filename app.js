var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.get('/search', function(req, res){
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var fullName = firstName + ' ' + lastName;

  console.log(fullName);

  var ResultsArray = [];
  var instream = fs.createReadStream('public/2017aug.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line){
    var results = line.toUpperCase();
    if(results.includes(firstName) && results.includes(lastName)){
      results = results.split(/[\t]+/);
      console.log(results.length);
      var email;
      for(var i = 0; i<results.length; i++){
        //console.log(results[i], results[i].length);
      }
    }
  }).on('close', function(){
    /*
      res.send(ResultsArray)
    */
    console.log('AllDone!');
  })
});

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
