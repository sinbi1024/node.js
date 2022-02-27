const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sb700210',
    database: 'jsman',
    port: 3306
});

connection.connect();

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/sending', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

app.post('/email_post', (req, res) => {
    console.log(req.body.email);
    res.render('email.ejs', { 'email': req.body.email });
});

app.post('/ajax_send_email', (req, res) => {
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