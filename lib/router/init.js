const express = require('express');
const router = express.Router();

const startParty = require('../controller/init');
const checkOpen = require('../middleware/checkOpen');

router.get('/', (req, res) => {
    res.render('init');
});

router.post('/', checkOpen, startParty);

module.exports = router;