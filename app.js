const express = require('express');
const app = express();
const cors = require('cors');

const index = require('./routes/index');
const email = require('./routes/email/email');
const register = require('./routes/register/register');

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(index);
app.use(email);
app.use(register);