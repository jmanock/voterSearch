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
   var instream = fs.createReadStream('public/folder/2017sep.txt');
  //var instream = fs.createReadStream('public/folder/2012Florida.txt');
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line){
    var results = line.toUpperCase();
     if(results.includes(firstName) && results.includes(lastName)){

      results = results.split(/[\t]+/);
       //console.log(results)
      var email;

      for(var i = 0; i<results.length; i++){
        // Check for zip
        if(results[i].length >= 5 && i !== 1){
          if(!isNaN(results[i])){
            if(results[i].includes('.')){
              // This should always be zip
            }else{
              var zip = results[i];
            }
          }
        }

        // Find Address
        if(results[i].includes(' ')){
          // Have to find the index with num and char
          console.log(results[]);
        }
        /*
          ~ Things I want back
            - Dob √
            - FirstName
            - LastName √
            - Address
            - Country Code √
            - Age √
            - Zip √
          ~ Maybe
            - Gender √
            - Phone Number
            - Email
        */
        var CountyCode = results[0];
        var VoterId = results[1];
        var LastName = results[2];

        if(results[i].includes('/')){
          var registration = results[i];
          var dob = results[i-1];
          var race = results[i-2];
          var gender = results[i-3];
        }
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
          age --;
        }
      }
      //console.log('Age:', age, 'Dob:', dob, 'Gender:', gender);
      //console.log(zip, age, gender, dob);
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
