const express = require('express');
const router = express.Router();

const { config } = require('../config');
const partyController = require('../controller/party');

router.get('/', (req, res) => {
    res.render('party', {
        title: config.title,
    });
});

router.get('/next', partyController.getNextVideo);

module.exports = router;