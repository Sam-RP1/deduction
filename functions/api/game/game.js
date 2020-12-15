const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const wordFuncs = require('../../modules/generateWords.js');

const game = express.Router();

module.exports = game;

game.use(cors({ origin: true }));
game.use(bodyParser.json());
game.use(bodyParser.urlencoded({ extended: true }));

//   DISPLAYS
//   GET     /:gameid             - retrieves a games data using the 'gameid: provided
//   POST    /refresh             - refreshes clients local game data to keep it upto date
//   POST    /restart             - creates a new game by resetting the stored game data and regenerating 25 words using the previously applied method
//   POST    /turn                - changes the stored turn for a game

game.get('/:gameid', async (req, res) => {
    try {
        const collection = 'gameInstances';
        const gameId = req.params.gameid;

        const game = await admin.firestore().collection(collection).doc(gameId).get();

        if (!game.exists) {
            res.send({ exists: false });
        } else {
            const gameData = game.data();
            gameData.exists = true;
            res.send(gameData);
        }
    } catch (e) {
        res.send({
            error: e,
        });
    }
});

game.post('/refresh', async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const clientGameData = req.body.gameData;
        const collection = 'gameInstances';
        console.log(clientGameData);

        // Get game
        const storedGameData = await admin.firestore().collection(collection).doc(gameId).get();

        if (!storedGameData.exists) {
            throw 'Invalid Game ID'; // eslint-disable-line
        } else {
            wordGroup = gameData.data().wordGroup;
            customWords = gameData.data().customWords;
            quickGame = gameData.data().quickGame;
            turnTimer = gameData.data().turnTimer;
        }

        // Game Settings
        // Only send what has changed and it can be merged in redux
        const newGame = {
            words: words,
            gameTimer: gameTimer,
            guessesBlue: [],
            guessesRed: [],
            lastQuery: Date.now(),
            score: { red: 9, blue: 8 },
            turn: 'red',
        };

        res.send(newGame);
    } catch (e) {
        res.send({
            error: e,
        });
    }
});

game.post('/restart', async (req, res) => {
    try {
        const gameId = req.body.gameId;
        let wordGroup;
        let customWords;
        let quickGame;
        let turnTimer;
        const collection = 'gameInstances';

        // Get game
        const gameData = await admin.firestore().collection(collection).doc(gameId).get();

        if (!gameData.exists) {
            throw 'Invalid Game ID'; // eslint-disable-line
        } else {
            wordGroup = gameData.data().wordGroup;
            customWords = gameData.data().customWords;
            quickGame = gameData.data().quickGame;
            turnTimer = gameData.data().turnTimer;
        }

        // Game Words
        const words = await wordFuncs.generateWords(wordGroup, customWords);
        console.log('WORDS GENERATED', words);

        // Game Timer
        let gameTimer = 0;
        if (quickGame === true) {
            gameTimer = 360000;
        }

        // Game Settings
        const newGame = {
            words: words,
            gameTimer: gameTimer,
            guessesBlue: [],
            guessesRed: [],
            lastQuery: Date.now(),
            score: { red: 9, blue: 8 },
            turn: 'red',
        };

        await admin.firestore().collection(collection).doc(gameId).set(newGame, { merge: true });

        res.send(newGame);
    } catch (e) {
        res.send({
            error: e,
        });
    }
});

game.post('/turn', async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const nextTurn = req.body.turn === 'red' ? 'blue' : 'red';
        const collection = 'gameInstances';

        // Move to a middleware
        // Get game
        const gameData = await admin.firestore().collection(collection).doc(gameId).get();

        if (!gameData.exists) {
            throw 'Invalid Game ID'; // eslint-disable-line
        }

        // Turn Update
        const update = {
            lastQuery: Date.now(),
            turn: nextTurn,
        };

        await admin.firestore().collection(collection).doc(gameId).set(update, { merge: true });

        res.status(200).send({ msg: '[TURN] changed to ' + nextTurn + ' team' });
    } catch (e) {
        res.send({
            error: e,
        });
    }
});
