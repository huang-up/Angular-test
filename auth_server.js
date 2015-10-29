var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/app');  // Does not wait for connection here
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connection.on("open", function() {   // But this waits for connection
    // All Setup here - But especially this
	app.use(expressSession({
	  secret: 'SECRET',
	  cookie: {maxAge: 60*60*1000},
	  resave: true,
	  saveUninitialized: true,
	  store: new mongoStore({
	    db: mongoose.connection.db,
	    collection: 'sessions' //default: sessions
	  })
	}));
	require('./routes/routes.js')(app);
	app.listen(3000);
});

	