const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');

const index = require('./routes/index');
const email = require('./routes/email/email');
const register = require('./routes/register/register');
const login = require('./routes/login/login');

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'keboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

app.use(index);
app.use(email);
app.use(register);
app.use(login);