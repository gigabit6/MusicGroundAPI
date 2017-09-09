var db = require('../config/db');

module.exports = {
	insertUser : (data) => {
		return new Promise((resolve, reject) => {

			db.get().query('INSERT INTO `users` (`username`, `email`, `password`) VALUES ("' + data.username + '" , "' + data.email + '" , "' + data.password + '" ); ', (err) => {
				if(err) {
					reject(err);
				}
				resolve();
			});
		});
	},
	getUser : (data) => {
		return new Promise((resolve, reject) => {

			db.get().query('SELECT * FROM `users` WHERE  username="' + data.username + '"  AND password="' + data.password + '"', (err, data) => {
				if(err) {
					reject(err);
				}
				resolve(data[0]);
			});
		});
	},
	getUserById : (id) => {
		return new Promise((resolve, reject) => {

			db.get().query('SELECT * FROM `users` WHERE  id="' + id + '"', (err, data) => {
				if(err) {
					reject(err);
				}
				resolve(data[0]);
			});
		});
	},
	getUserByUsername : (username) => {
		return new Promise((resolve, reject) => {

			db.get().query('SELECT * FROM `users` WHERE  username="' + username + '"', (err, data) => {
				if(err) {
					reject(err);
				}
				resolve(data[0]);
			});
		});
	},
	getUserByEmail : (email) => {
		return new Promise((resolve, reject) => {

			db.get().query('SELECT * FROM `users` WHERE  email="' + email + '" ', (err, data) => {
				if(err) {
					reject(err);
				}
				resolve(data[0]);
			});
		});
	}
};