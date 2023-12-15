const express = require('express');
const router = express.Router();
const md5 = require('md5');

const checkSession = require('../middleware/checkSession');
const queueController = require('../controller/queue');
const { users } = require('../config');

router.get('/', checkSession, (req, res) => {
    if (res.locals.isLoggedIn) {
        const userIndex = users.findIndex(user => user.keycode === md5(req.session.keycode));
        res.render('queue', {
            queue: users[userIndex].queue,
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/load/:id', checkSession, queueController.findVideo);

router.get('/delete/:index', checkSession, queueController.deleteVideo);

router.post('/add', checkSession, queueController.addVideo);

module.exports = router;