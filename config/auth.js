var userService = require('../services/users');

var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'I Love Chickens';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	userService.getUserById(jwt_payload.id).then((user) => {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});

});

module.exports = {
	initializePassport : () => {
		passport.use(strategy);
	},
	jwtOptions : jwtOptions
};