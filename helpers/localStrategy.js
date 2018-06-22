let User = require('./users');
let localStrategy = require('passport-local').Strategy;
let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;
let config = require('./config');

module.exports.localStrategy = new localStrategy({
    usernameField: 'ced',
    passwordField: 'password'
},function (username, password, done) {
    User.getUserByUsername(username).then((user) => {
        if (user.error) {
            return done(null, false);
        }
        User.comparePassword(password, user.password).then((isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false);
        }).catch((err) => {
            throw err;
        });
    }).catch((err) => {
        throw err;
    });
});
/*module.exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.secret
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return UserModel.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
})*/