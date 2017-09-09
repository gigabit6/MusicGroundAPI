let env = process.env.NODE_ENV || 'development';
let settings = require('./settings')[env];

var mysql = require('mysql');

var state = {
	connection: null
};

module.exports.connect = function (done) {

	state.connection = mysql.createConnection({
		host: settings.host,
		user: settings.user,
		password: settings.password,
		database : settings.database,
		multipleStatements : true
	});

	done();
};

module.exports.get = function () {
	return state.connection;
};
