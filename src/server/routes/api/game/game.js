const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbGame = require('../../../db/game/game');
const { SUCCESS, FAIL, EMPTY } = require('../../../statusTypes');
const { getWordBundles } = require('../../../config.js');

const game = express.Router();

module.exports = game;

game.use(cors({ origin: true }));
game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

game.get('/:gameid/:gamepassword', async (req, res) => {
    try {
        const gameId = req.params.gameid;
        const gamePassword = req.params.gamepassword;

        const game = await dbGame.getGame(gameId, gamePassword);

        if (game.status === SUCCESS) {
            const bundles = getWordBundles();
            game.data.wordGroups = bundles;
            res.status(200).json({ status: SUCCESS, data: game.data });
        } else {
            res.status(404).json({ status: FAIL, msg: game.msg });
        }
    } catch (e) {
        res.status(500).json({ status: FAIL, error: e });
    }
});

game.post('/', async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const gamePassword = req.body.gamePassword;

        const isAllowed = await dbGame.checkNumGames();

        if (isAllowed.status === SUCCESS) {
            const result = await dbGame.checkGameId(gameId);

            if (result.status === EMPTY) {
                const newGame = {
                    gameId: gameId,
                    gamePassword: gamePassword,
                };

                const game = await dbGame.createGame(newGame);

                if (game.status === SUCCESS) {
                    const bundles = getWordBundles();
                    game.data.wordGroups = bundles;
                    res.status(201).json({ status: SUCCESS, data: game.data });
                } else {
                    res.status(500).json({ status: FAIL, msg: game.msg });
                }
            } else {
                res.status(409).json({
                    status: FAIL,
                    msg: 'A game with that name already exists, please try another name.',
                });
            }
        } else {
            res.status(409).json({
                status: FAIL,
                msg:
                    'Sorry! Unfortunately there are too many games underway right now. Please try again later. New game slots should become available at the start of every hour.',
            });
        }
    } catch (e) {
        res.status(500).json({ status: FAIL, error: e });
    }
});
