const { config } = require('../config');

const checkOpen = function (req, res, next) {
    if (config.onAir || Math.floor(req.body.participants) < 2) {
        res.send('This party is already opened or not ready to open.');
    } else {
        next();
    }
};

module.exports = checkOpen;