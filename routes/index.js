const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/main', (req, res) => {
    var email = req.user;
    res.render('index.ejs', { 'email': email });
});

module.exports = router;