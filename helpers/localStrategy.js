const User = require('./user');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy((username, password, done) => {
    User.getUserData(username).then((data) => {
        if (data.error) {
            return done(null, false);
        }
        User.comparePassword(password, data.password).then((isMatch) => {
            if (isMatch) {
                return done(null, {id: data.id_user, username: data.username});
            } else {
                return done(null, false);
            }
        }).catch((error) => {
            throw error;
        })
    }).catch((error) => {
        throw error;
    })
});