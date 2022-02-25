const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

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
    var resData = {'response': 'ok', 'email': req.body.email};
    res.json(resData);
});