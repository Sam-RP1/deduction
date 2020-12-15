const GameRouter = require('express').Router();

GameRouter.route('/:gameid').get(require('./game.js'));
GameRouter.route('/refresh').post(require('./game.js'));
GameRouter.route('/restart').post(require('./game.js'));
GameRouter.route('/turn').post(require('./game.js'));

module.exports = GameRouter;
