const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const _ = require('underscore');

// App
const app = express();

// App cross-origin requests
app.use(cors({ origin: true }));

// App middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// FB admin
admin.initializeApp();

// Word Imports
const wordGroups = require('./wordGroups.js');

// API
app.post('/createNewGame', async (req, res) => {
    try {
        const reqBody = req.body;
        console.log(reqBody);
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
        let words;
        const wordsArr = [];
        if (reqBody.customWords.length !== 25) {
            if (reqBody.wordGroup === 'eng-standard') {
                words = _.sample(wordGroups.engStandard, 25);
            } else {
                console.log('err selecting word group');
                words = _.sample(wordGroups.engStandard, 25);
            }
        } else {
            words = reqBody.customWords;
        }

        const redWords = _.sample(words, 9);
        const noRedWords = words.filter((word) => !redWords.includes(word));
        const blueWords = _.sample(noRedWords, 8);
        const noBlueRedWords = noRedWords.filter((word) => !blueWords.includes(word));
        const blankWords = _.sample(noBlueRedWords, 7);
        const bombWord = noBlueRedWords.filter((word) => !blankWords.includes(word));

        for (let i = 0; i < 9; i++) {
            wordsArr.push({ denomination: 'red', word: redWords[i] });
        }
        for (let i = 0; i < 8; i++) {
            wordsArr.push({ denomination: 'blue', word: blueWords[i] });
        }
        for (let i = 0; i < 7; i++) {
            wordsArr.push({ denomination: 'blank', word: blankWords[i] });
        }
        wordsArr.push({ denomination: 'bomb', word: bombWord[0] });
        console.log(wordsArr);

        // Game Timer
        let gameTimer = 0;
        if (reqBody.quickGame === true) {
            gameTimer = 360000;
        }

        // Game Settings
        const newGame = {
            created: Date.now(),
            id: gameId,
            words: wordsArr,
            gameTimer: gameTimer,
            guessesBlue: [],
            guessesred: [],
            lastQuery: Date.now(),
            quickGame: reqBody.quickGame,
            turnTimer: reqBody.turnTimer,
            score: { red: 9, blue: 8 },
            turn: 'red',
        };

        await admin.firestore().collection(collection).doc(gameId).set(newGame);

        res.send(newGame);
    } catch (e) {
        console.log(e);
        res.send({
            error: e,
        });
    }
});

exports.deduction = functions.https.onRequest(app);
