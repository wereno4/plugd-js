const express = require('express');
const checkUser = require('../middleware/checkUser');
const checkSession = require('../middleware/checkSession');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', checkSession, checkUser, (req, res) => res.redirect('/queue'));

module.exports = router;