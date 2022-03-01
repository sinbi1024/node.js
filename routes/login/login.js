const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const passport = require('passport');
const { redirect } = require('express/lib/response');
const LocalStrategy = require('passport-local').Strategy;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sb700210',
    database: 'jsman',
    port: 3306
});

connection.connect();

router.get('/login', (req, res) => {
    var msg;
    var errMsg = req.flash('error');

    if (errMsg) msg = errMsg;

    res.render('login.ejs', { 'message': msg });
});

passport.serializeUser((user, done) => {
    console.log("passport session save: ", user.email);
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    console.log("passport session get email: ", email);
    done(null, email);
})

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true }, (req, email, passwd, done) => {
        var query = connection.query('select * from users where email=?', [email], (err, rows) => {
            if (err) return done(err);

            if (rows.length) {
                return done(null, { 'email': email });
            } else {
                return done(null, false, { 'message': 'your info is not found....'});
            }
        });
    }
));

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) res.status(500).json(err);
        if (!user) return res.status(401).json(info.message);

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json(user);
        });
    })(req, res, next);
});

module.exports = router;