const { config, users } = require('../config');

function getNextVideo(req, res) {
    let nextVideo = null;
    do {
        if (users[config.nextPlayer].queue.length !== 0) {
            nextVideo = users[config.nextPlayer].queue.shift();
            nextVideo.username = users[config.nextPlayer].name;
        }
        config.nextPlayer++;
        if (config.nextPlayer === users.length) {
            config.nextPlayer = 0;
            if (users.reduce((sum, user) => {
                sum += user.queue.length;
            }) === 0) {
                nextVideo = {};
                config.isQueueEmpty = true;
            }
        }
    } while (!nextVideo);
    return res.send(nextVideo);
}

function checkRestart(req, res) {
    res.send({ started: !config.isQueueEmpty });
}

module.exports = { getNextVideo, checkRestart };