const md5 = require('md5');
const { config, users } = require('../config');

const checkUser = function (req, res, next) {
    if (res.locals.isLoggedIn) {
        next();
    } else {
        let keycode = md5(req.body.keycode);
        for (let user of users) {
            if (user.name === req.body.username) {
                if (user.keycode === keycode) {
                    req.session.keycode = req.body.keycode;
                    req.session.partyId = config.id;
                    return next();
                } else {
                    res.send('Invalid keycode for joined user.');
                    return;
                }
            }
        }
        for (let i = 0; i < config.keycode.length; i++) {
            if (config.keycode[i] === keycode) {
                users.push({
                    name: req.body.username,
                    keycode: keycode,
                    queue: []
                });
                config.keycode.splice(i, 1);
                req.session.keycode = req.body.keycode;
                req.session.partyId = config.id;
                return next();
            }
        }
        res.send('Invalid keycode for new user.');
    }
};

module.exports = checkUser;