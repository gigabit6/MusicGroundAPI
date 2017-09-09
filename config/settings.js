const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
	development: {
		rootPath: rootPath,
		host: 'localhost',
		port: 3030,
		user: 'root',
		password : '',
		database : 'music_ground'
	}
};