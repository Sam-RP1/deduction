const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const wordFuncs = require('../../modules/generateWords.js');

const create = express.Router();

module.exports = create;

create.use(cors({ origin: true }));
create.use(bodyParser.json());
create.use(bodyParser.urlencoded({ extended: true }));

// Function
create.post('/', async (req, res) => {
    try {
        const wordGroup = req.body.wordGroup;
        const customWords = req.body.customWords;
        const quickGame = req.body.quickGame;
        const turnTimer = req.body.turnTimer;
        const collection = 'gameInstances';

        // Game ID
        let gameId;
        let isUnique = false;
        /* eslint-disable no-await-in-loop */
        while (isUnique === false) {
            gameId = uuidv4();
            let result = await admin.firestore().collection(collection).doc(gameId).get();
            if (!result.exists) {
                isUnique = true;
            }
        }
        /* eslint-enable no-await-in-loop */

        // Game Words
        const words = await wordFuncs.generateWords(wordGroup, customWords);

        // Game Timer
        let gameTimer = 0;
        if (quickGame === true) {
            gameTimer = 360000;
        }

        // Game Settings
        const newGame = {
            created: Date.now(),
            id: gameId,
            words: words,
            wordGroup: wordGroup,
            customWords: customWords,
            gameTimer: gameTimer,
            guessesBlue: [],
            guessesRed: [],
            lastQuery: Date.now(),
            quickGame: quickGame,
            turnTimer: turnTimer,
            score: { red: 9, blue: 8 },
            turn: 'red',
        };

        await admin.firestore().collection(collection).doc(gameId).set(newGame);

        res.send(newGame);
    } catch (e) {
        res.send({
            error: e,
        });
    }
});

create.post('/refresh', async (req, res) => {
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
