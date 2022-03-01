const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sb700210',
    database: 'jsman',
    port: 3306
});

connection.connect();

router.get('/register', (req, res) => {
    var msg;
    var errMsg = req.flash('error');

    if (errMsg) msg = errMsg;

    res.render('register.ejs', { 'message': msg });
});

passport.serializeUser((user, done) => {
    console.log("passport session save: ", user.email);
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    console.log("passport session get email: ", email);
    done(null, email);
})

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true
}, (req, email, passwd, done) => {
    var query = connection.query('select * from users where email=?', [email], (err, rows) => {
        if (err) return done(err);

        if (rows.length) {
            console.log('existed user');
            
            return done(null, false, { message: 'your email is already existed' });
        } else {
            var sql = { email: email, passwd: passwd };
            var query = connection.query("insert into users set ?", sql, (err, rows) => {
                if (err) throw err;

                return done(null, { 'email': email });
            });
        }
    });
}));

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/main',
    failureRedirect: '/register',
    failureFlash: true
}));

// router.post('/register', (req, res) => {
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.passwd;

//     var sql = { 'email': email, 'name': name, 'passwd': passwd };

//     var query = connection.query(
//         'insert into users set ?', sql, (err, rows) => {
//             if (err) throw err;
//             else res.render('welcome.ejs', { 'name': name, 'email': email });
//     })
// });

module.exports = router;