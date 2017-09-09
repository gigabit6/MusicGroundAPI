var userService = require('../services/users.js');
var auth = require('../config/auth');
var jwt = require('jsonwebtoken');

module.exports = {

	register : (req, res) => {
		var data = req.body;

		if(data.username === '' || data.password === '' || data.email === '' || data.passwordRepeat === '') {

			res.status(403).json({error : 'Please fill all fields'});

			return;
		}

		// eslint-disable-next-line
		var passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}');
		if(!passwordRegEx.test(data.password)) {

			res.status(403).json({error : 'Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character ($@$!%*?&)'});

			return;
		}
		userService.getUserByUsername(data.username).then((userData) => {
			if (userData) {
				res.status(403).json({error : 'User With This username exists'});

				return;
			}

			userService.getUserByEmail(data.email).then((emailData) => {
				if (emailData) {
					res.status(403).json({error : 'User With This email exists'});

					return;
				}

				userService.insertUser(data).then(() => {
					res.sendStatus(200);
				});
			});

		});

	},
	login : (req, res) => {
		if(req.body.username && req.body.password) {
			var username = req.body.username;
			var password = req.body.password;
		}
		userService.getUser({'username' : username, 'password' : password}).then((user) => {
			if(!user) {
				res.status(401).json({message:'no such user found'});

				return;
			}

			if(user.password === req.body.password) {
				var payload = {id: user.id, username : user.username};
				var token = jwt.sign(payload, auth.jwtOptions.secretOrKey);
				res.json({message: 'ok', token: token});
			} else {
				res.status(401).json({message:'Passwords did not match'});
			}
		});

	},
	saveConfig : (req, res) => {
		var data = req.body;
		userService.saveConfig(data).then(() => {
			res.sendStatus(200);
		});
	},
	getConfig : (req, res) => {
		userService.getConfig().then((data) => {
			res.json(data);
		});
	}
};