const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const dbGame = require('../../../db/db-game/db-game');
const { SUCCESS, FAIL, EXISTS } = require('../../../config/statusTypes');

const game = express.Router();

// const io = game.get('socketIO'); didnt work

module.exports = game;

game.use(cors({ origin: true }));
game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

game.post('/', async (req, res) => {
    try {
        const gameName = req.body.gameName;
        const gamePassword = req.body.gamePassword;
        const playerName = req.body.playerName;
        const randStrLength = 29 - gameName.length;

        let gameId;
        let isUnique = false;
        while (isUnique === false) {
            const randStr = randomstring.generate({ length: randStrLength, charset: 'alphanumeric' });
            gameId = gameName + '-' + randStr;
            const result = await dbGame.checkGameId(gameId);
            result === EXISTS ? (isUnique = false) : (isUnique = true);
        }

        const io = req.app.locals.io;
        io.emit('conc', { data: 'data' });

        const newGame = {
            gameId: gameId,
            gamePassword: gamePassword,
            players: {},
        };

        const game = await dbGame.createGame(newGame);

        if (game.status === SUCCESS) {
            res.status(201).json({ status: SUCCESS, data: game.data });
        } else {
            res.status(500).json({ status: FAIL, msg: game.msg });
        }
    } catch (e) {
        res.status(500).json({ status: FAIL, error: e });
    }
});
