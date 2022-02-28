const express = require('express');
const app = express();
const cors = require('cors');
const index = require('./router/index');

app.listen(3000, () => {
    console.log("start! express server on port 3000");
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(index);