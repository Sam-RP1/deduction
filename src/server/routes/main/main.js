const express = require('express');
const cors = require('cors');
const path = require('path');

const main = express.Router();

module.exports = main;

main.use(cors({ origin: true }));

const publicPath = process.env.NODE_ENV === 'PRODUCTION' ? '../../public' : 'public';

main.get(['/', '/creategame', '/joingame', '/game'], (req, res) => {
    res.sendFile(path.join(__dirname, publicPath, 'index.html'));
});
