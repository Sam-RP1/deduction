'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const sockets = require('./sockets/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();
require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

// Server
const PORT = process.env.PORT || 80;

http.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});

sockets.init(http);
