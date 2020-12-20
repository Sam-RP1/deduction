/**
 * routes/api/game/index.js
 **/
const GameRouter = require('express').Router();

GameRouter.route('/').post(require('./game'));

module.exports = GameRouter;
