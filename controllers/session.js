const express = require('express');
const passport = require('passport');
const auth = require('../middlewares/authorize');
let router = express.Router();

router.get('/value', auth.isAuth, (req, res) => {
    console.log(req.session);
    res.send({session: req.session.passport});
})

router.post('/login', auth.isLogged, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info
            })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                })
            }
            res.status(200).send({
                status: 'Login successful!'
            })
        })
    })(req, res, next);
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.status(200).send({
        status: 'Bye!'
    })
});

module.exports = router;