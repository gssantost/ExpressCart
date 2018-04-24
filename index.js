const express = require('express');
let session = require('express-session');
let passport = require('passport');
const strategy = require('./helpers/localStrategy');
const config = require('./helpers/config');
const app = express();

app.use('/views', express.static(__dirname + '/public'));
app.use('/materialize', express.static(__dirname + '/node_modules/materialize-css/dist/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.get('/', (req, res) => {
    res.redirect('views/index.html');
})
app.use('/', require('./controllers'));
passport.use(strategy);
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

app.listen(config.port, () => {
    console.log(`Application listening on port ${config.port}`);
});