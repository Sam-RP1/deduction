/**
 * routes/api/index.js
 **/
const ApiRouter = require('express').Router();

ApiRouter.use('/game', require('./game'));

module.exports = ApiRouter;
