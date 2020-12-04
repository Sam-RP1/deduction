const { response } = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const _ = require('underscore');

admin.initializeApp();

const wordGroups = require('./wordGroups.js');

// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.createNewGame = functions.https.onRequest(async (req, res) => {
    try {
        const collection = 'gameInstances';
        let gameId;
        let isUnique = false;

        while (isUnique === false) {
            gameId = uuidv4();
            let result = await admin.firestore().collection(collection).doc(gameId).get();
            if (!result.exists) {
                isUnique = true;
            }
        }

        const words = _.sample(wordGroups.engStandard, 25);
        const newGame = {
            created: Date.now(),
            id: gameId,
            words: words,
            gameTimer: 'tbd',
            guessesBlue: ['wordExample'],
            guessesred: ['wordExample2'],
            lastQuery: Date.now(),
            quickGame: false,
            turnTimer: false,
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
