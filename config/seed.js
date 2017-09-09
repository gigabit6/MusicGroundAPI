let env = process.env.NODE_ENV || 'development';
let settings = require('./settings')[env];

var mysql = require('mysql');

var state = {
	connection: null
};

var fs = require('fs');
var	_ = require('underscore');

var connect = function (done) {

	state.connection = mysql.createConnection({
		host: settings.host,
		user: settings.user,
		password: settings.password,
		multipleStatements : true
	});

	done();
};

var get = function () {
	return state.connection;
};

function exec (sql, callback) {
	get().query(sql, function (err, results) {
		if (!_.isArray(results)) {
			results = [results];
		}
		callback(err, results);
	});

	return this;
}

function execFile (filename, callback) {
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;
		exec(data, callback);
	});

	return this;
}

module.exports = () => {
	var	sqlFile = __dirname + '/seed.sql';

	connect(() => {
		execFile(sqlFile, function (err) {
			if(err) {
				console.log(err);
			}
		});
	});

};