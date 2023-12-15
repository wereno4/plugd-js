const md5 = require('md5');
const { config } = require('../config');

function startParty(req, res) {
    config.onAir = true;
    config.id = Math.random().toString(36).substring(2, 9);
    config.title = req.body.title;
    config.participants = Math.floor(req.body.participants);
    console.log(config.participants + ' users will participate.');
    console.log('These are you keycodes.');
    for (let i = 0; i < config.participants; i++) {
        const keycode = Math.random().toString(36).substring(2, 17);
        console.log(keycode);
        config.keycode.push(md5(keycode));
    }
    res.send('Done!');
}

module.exports = startParty;