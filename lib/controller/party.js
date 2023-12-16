const { config, users } = require('../config');

function getNextVideo(req, res) {
    let nextVideo = null;
    if (users.reduce((sum, user) => sum += user.queue.length, 0) === 0) {
        nextVideo = {};
        config.isQueueEmpty = true;
    } else {
        do {
            if (users[config.nextPlayer].queue.length !== 0) {
                nextVideo = users[config.nextPlayer].queue.shift();
                nextVideo.username = users[config.nextPlayer].name;
            }
            config.nextPlayer++;
            if (config.nextPlayer === users.length) {
                config.nextPlayer = 0;
            }
        } while (!nextVideo);
    }
    return res.send(nextVideo);
}

function checkRestart(req, res) {
    res.send({ started: !config.isQueueEmpty });
}

module.exports = { getNextVideo, checkRestart };