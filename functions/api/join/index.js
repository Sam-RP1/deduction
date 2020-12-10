const JoinRouter = require('express').Router();

JoinRouter.route('/:gameid').get(require('./join.js'));

module.exports = JoinRouter;
