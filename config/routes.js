const controllers = require('../controllers');
var passport = require('passport');

module.exports = (app) => {

	app.options('*', (req, res) => {
		res.sendStatus(200);
	});

	app.post('/register', controllers.users.register);

	app.post('/login', controllers.users.login);

	app.all('*', (req, res) => {
		res.status(404);
		res.send('404 Not Found!');
		res.end();
	});

};