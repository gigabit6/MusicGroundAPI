var express = require('express');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var settings = require('./config/settings')[env];
var db = require('./config/db');
var passport = require('passport');
var seed = require('./config/seed');

var app = express();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});

require('./config/routes')(app);
require('./config/auth').initializePassport();

seed();

db.connect ((err) => {

	if (err) {
		console.log('Unable to connect to MySQL.' + err);
		process.exit(1);
	}

	app.listen(settings.port, function () {
		console.log(`Server listening on port ${settings.port}...`);
	});

});