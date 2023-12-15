const { config, users } = require('../config');
const md5 = require('md5');

const checkSession = function (req, res, next) {
    if (req.session.partyId === config.id && users.some(user => user.keycode === md5(req.session.keycode))) {
        res.locals.isLoggedIn = true;
        next();
    } else {
        res.locals.isLoggedIn = false;
        next();
    }
};

module.exports = checkSession;