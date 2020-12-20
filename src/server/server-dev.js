'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev.config.js');

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

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('conc', function (room) {
        // rooms.push(room);
        // socket.join(room);
        console.log('CONC');
    });
    socket.on('game_update', function (data) {
        //  console.log('message: ' + msg);
        console.log('game update');
        console.log(data);
    });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});

app.locals.io = io;

// Server
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
