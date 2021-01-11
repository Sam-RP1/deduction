'use strict';

const app = require('express')();
const http = require('http').createServer(app);
const sockets = require('./sockets/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev.config.js');
const schedule = require('node-schedule');
const { prune } = require('./db/game/game');

const compiler = webpack(config);

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();
require('./routes')(app);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);
app.use(webpackHotMiddleware(compiler));

// Server
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});

sockets.init(http);

const stageChecker = schedule.scheduleJob('48 * * * *', function () {
    prune();
});
