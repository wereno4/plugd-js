'use strict';

const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');

const initRoute = require('./lib/router/init');
const loginRoute = require('./lib/router/login');
const queueRoute = require('./lib/router/queue');
const partyRoute = require('./lib/router/party');
const { config } = require('./lib/config');


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname + '/lib/views');
app.set('view engine', 'ejs');

config.apiKey = process.env.YOUTUBE_API_KEY;

app.use('/init', initRoute);
app.use('/login', loginRoute);
app.use('/queue', queueRoute);
app.use('/party', partyRoute);

app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});