const md5 = require('md5');
const { config, users } = require('../config');


function findVideo(req, res) {
    if (res.locals.isLoggedIn) {

        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${req.params.id}&key=${config.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.pageInfo.totalResults > 0) {
                    const snippet = data.items[0].snippet;

                    const thumbnail = snippet.thumbnails.default.url;
                    const title = snippet.title;
                    let duration, durationBySecond;

                    if (/PT\d+M\d+S/.test(data.items[0].contentDetails.duration)) {
                        duration = data.items[0].contentDetails.duration.replace(/PT(\d+)M(\d+)S/, (_, p1, p2) => {
                            durationBySecond = parseInt(p1) * 60 + parseInt(p2);
                            return p1 + ':' + p2;
                        });
                    } else if (/PT\d+H\d+M\d+S/.test(data.items[0].contentDetails.duration)) {
                        duration = data.items[0].contentDetails.duration.replace(/PT(\d+)H(\d+)M(\d+)S/, (_, p1, p2, p3) => {
                            durationBySecond = parseInt(p1) * 3600 + parseInt(p2) * 60 + parseInt(p3);
                            return p1 + ':' + p2 + ':' + p3;
                        });
                    } else if (/P\d+DT\d+M\d+S/.test(data.items[0].contentDetails.duration)) {
                        duration = data.items[0].contentDetails.duration.replace(/P(\d+)DT(\d+)H(\d+)M(\d+)S/, (_, p1, p2, p3, p4) => {
                            durationBySecond = parseInt(p1) * 86400 + parseInt(p2) * 3600 + parseInt(p3) * 60 + parseInt(p4);
                            return p1 + ' ' + p2 + ':' + p3 + ':' + p4;
                        });
                    }
                    res.send({
                        videoId: req.params.id,
                        title: title,
                        thumbnail: thumbnail,
                        duration: duration,
                        second: durationBySecond,
                    });
                } else {
                    res.send({});
                }
            });

    } else {
        res.redirect('/login');
    }
}

function deleteVideo(req, res) {
    if (res.locals.isLoggedIn) {
        const userIndex = users.findIndex(user => user.keycode === md5(req.session.keycode));
        const videoIndex = parseInt(req.params.index);
        users[userIndex].queue.splice(videoIndex, 1);
        res.redirect('/queue');
    } else {
        res.redirect('/login');
    }
}

function addVideo(req, res) {
    if (res.locals.isLoggedIn) {
        const item = req.body;
        item.second = parseInt(item.second);
        const userIndex = users.findIndex(user => user.keycode === md5(req.session.keycode));
        users[userIndex].queue.push(item);
        if (config.isQueueEmpty) {
            config.isQueueEmpty = false;
        }
        res.redirect('/queue');
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    findVideo,
    deleteVideo,
    addVideo,
};