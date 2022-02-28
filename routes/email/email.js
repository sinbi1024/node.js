const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sb700210',
    database: 'jsman',
    port: 3306
});

connection.connect();

router.get('/email', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/form.html'));
});

app.set('view engine', 'ejs');

router.post('/email/form', (req, res) => {
    console.log(req.body.email);
    res.render('email.ejs', { 'email': req.body.email });
});

router.post('/email/ajax', (req, res) => {
    var email = req.body.email;
    var resData = {};

    var query = connection.query('select name from users where email="' + email + '"', (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            resData.result = "ok";
            resData.name = rows[0].name;
        } else {
            resData.result = "none";
            resData.name = "";
        }

        res.json(resData);
    });
});

module.exports = router;