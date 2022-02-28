const express = require('express');
const router = express.Router();
const path = require('path');
const email = require("./email/email");

router.use('/email', email);

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/email', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/form.html'));
})

module.exports = router;