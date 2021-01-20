'use strict';

//------------- GLOBAL VARIABLES -------------//
const mysql = require('mysql2/promise');
const _ = require('underscore');
const fs = require('fs');
const e = require('cors');
require('dotenv').config();

const errorStream = fs.createWriteStream(__dirname + '/logs/error.txt', { flags: 'a+' });

const dbData = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'deduction_DB',
};

module.exports.logError = (e) => {
    const newEntry = new Date().toISOString() + ': ' + e + '\n';
    errorStream.write(newEntry);
};

module.exports.getWordBundles = async () => {
    const sql = await mysql.createConnection(dbData);
    const [result] = await sql.query(sql.format('select bundle_id, category, is_enabled from word_bundles'));

    const bundleArray = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i].is_enabled === 1) {
            bundleArray.push(result[i].bundle_id);
        }
    }

    return bundleArray;
};

module.exports.generateWords = async (bundle, isCustom) => {
    let bundleWords;

    if (isCustom === false) {
        const sql = await mysql.createConnection(dbData);
        const [result] = await sql.query(
            sql.format('select easy, normal, hard, expert from word_bundles where bundle_id = ?', [bundle])
        );
        const words = result[0];

        words.easy = JSON.parse(words.easy);

        // Exception languages use code 0 and only use easy difficulty
        // Next ver will implement the use of word difficulty tiers by allowing multiple to be selected or just one as long as it has 25 words
        if (words.expert !== null && words.hard !== null && words.normal !== null) {
            words.expert = JSON.parse(words.expert);
            words.hard = JSON.parse(words.hard);
            words.normal = JSON.parse(words.normal);
            bundleWords = words.easy.concat(words.normal, words.hard, words.expert);
        } else if (words.hard !== null && words.normal !== null) {
            words.hard = JSON.parse(words.hard);
            words.normal = JSON.parse(words.normal);
            bundleWords = words.easy.concat(words.normal, words.hard);
        } else if (words.normal !== null) {
            words.normal = JSON.parse(words.normal);
            bundleWords = words.easy.concat(words.normal);
        } else {
            bundleWords = words.easy;
        }
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
