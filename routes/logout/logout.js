const express = require('express');
const app = express();
const router = express.Router();

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;