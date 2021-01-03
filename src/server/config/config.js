'use strict';

//------------- GLOBAL VARIABLES -------------//
const mysql = require('mysql2/promise');
const _ = require('underscore');
const fs = require('fs');
const wordGroups = require('../appdata/wordGroups.js');
require('dotenv').config();

const errorStream = fs.createWriteStream(__dirname + '/logs/error.txt', { flags: 'a+' });

const dbData = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'deduction_DB',
};

module.exports.logError = (e) => {
    const newEntry = new Data().toISOString() + ': ' + e + '\n';
    errorStream.write(newEntry);
};

module.exports.getWordBundles = () => {
    const keys = Object.keys(wordGroups);
    const idArray = [];
    for (let i = 0; i < keys.length; i++) {
        idArray.push(wordGroups[keys[i]].id);
    }
    return idArray;
};

module.exports.generateWords = (bundle, isCustom) => {
    let bundleWords;

    if (isCustom === false) {
        bundleWords = wordGroups[bundle].words;
    } else {
        bundleWords = bundle;
    }

    let words = _.sample(bundleWords, 25);

    // Allocate words between red, blue, blank and bomb
    const redWords = _.sample(words, 9);
    const noRedWords = words.filter((word) => !redWords.includes(word));
    const blueWords = _.sample(noRedWords, 8);
    const noBlueRedWords = noRedWords.filter((word) => !blueWords.includes(word));
    const blankWords = _.sample(noBlueRedWords, 7);
    const bombWord = noBlueRedWords.filter((word) => !blankWords.includes(word));

    // Push each denomination of words into an array
    const wordsArr = [];
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

    // Shuffle word array
    const shuffledWords = _.shuffle(wordsArr);

    // Assign words index numbers (0-24)
    for (let i = 0; i < shuffledWords.length; i++) {
        const guessData = {
            isGuessed: false,
            team: null,
        };

        shuffledWords[i].guessData = guessData;
        shuffledWords[i].index = i;
    }

    return shuffledWords;
};

module.exports.sqlPromise = mysql.createConnection(dbData);
