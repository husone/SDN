var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var User = require('./models/users');
var config = require('./config.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id })
            .then((user) => {
                if (user) return done(null, user);
                return done(null, false);
            })
            .catch((err) => {
                return done(err, false);
            })
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    }
    else {
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
    }
}

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookId: profile.id }).then((user) => {
        if (user) return done(null, user);
        user = new User({ username: profile.displayName });
        user.facebookId = profile.id;
        user.firstname = profile.name.givenName;
        user.lastname = profile.name.familyName;
        user.save().then((user) => {
            return done(null, user);
        })
            .catch((err) => {
                return done(err, false);
            })
    })
}));



