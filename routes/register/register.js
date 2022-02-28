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

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/register.html'));
});

router.post('/register', (req, res) => {
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.passwd;

    var sql = { 'email': email, 'name': name, 'passwd': passwd };

    var query = connection.query(
        'insert into users set ?', sql, (err, rows) => {
            if (err) throw err;
            else res.render('welcome.ejs', { 'name': name, 'email': email });
    })
})

module.exports = router;