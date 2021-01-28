'use strict';
const { SUCCESS, FAIL, ERROR } = require('../../statusTypes');
const { generateWords, sqlPromise, logError } = require('../../config');
const { parseGameData } = require('../config');
const _ = require('underscore');

module.exports.updateWordBundle = async (gameId, bundleId) => {
    try {
        const sql = await sqlPromise;
        const words = await generateWords(bundleId, false);
        const wordsStr = JSON.stringify(words);

        const score = { blue: 8, red: 9 };
        const scoreStr = JSON.stringify(score);
        const lastQuery = Date.now();

        await sql.query(
            sql.format(
                'update game_instances set word_group = ?, words = ?, score = ?, last_query = ? where game_id = ?',
                [bundleId, wordsStr, scoreStr, lastQuery, gameId]
            )
        );

        return { status: SUCCESS, wordBundle: bundleId, words: words, score: score };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not select word bundle.' };
    }
};

module.exports.addCustomWord = async (gameId, word) => {
    try {
        const sql = await sqlPromise;
        const [customWordsRes] = await sql.query(
            sql.format('select custom_words from game_instances where game_id = ?', [gameId])
        );
        const customWords = JSON.parse(customWordsRes[0].custom_words);
        if (customWords.length < 25) {
            customWords.push(word);
            const customWordsStr = JSON.stringify(customWords);
            const lastQuery = Date.now();

            await sql.query(
                sql.format('update game_instances set custom_words = ?, last_query = ? where game_id = ?', [
                    customWordsStr,
                    lastQuery,
                    gameId,
                ])
            );

            return { status: SUCCESS, customWords: customWords };
        } else {
            return { status: FAIL, error: 'You cannot have more than 25 custom words.' };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not add custom word.' };
    }
};

// could use filter
module.exports.removeCustomWord = async (gameId, word) => {
    try {
        const sql = await sqlPromise;
        const [customWordsRes] = await sql.query(
            sql.format('select custom_words from game_instances where game_id = ?', [gameId])
        );
        const customWords = JSON.parse(customWordsRes[0].custom_words);

        for (let i = 0; i < customWords.length; i++) {
            if (customWords[i] === word) {
                customWords.splice(i, 1);
                break;
            }
        }

        const customWordsStr = JSON.stringify(customWords);
        const lastQuery = Date.now();

        await sql.query(
            sql.format('update game_instances set custom_words = ?, last_query = ? where game_id = ?', [
                customWordsStr,
                lastQuery,
                gameId,
            ])
        );

        return { status: SUCCESS, customWords: customWords };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not remove custom word.' };
    }
};

module.exports.useCustomWords = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));
        const parsedData = await parseGameData(result[0]);
        const customWords = parsedData.customWords;

        if (customWords.length === 25) {
            const words = await generateWords(customWords, true);
            const wordsStr = JSON.stringify(words);
            const score = { blue: 8, red: 9 };
            const scoreStr = JSON.stringify(score);
            const lastQuery = Date.now();

            await sql.query(
                sql.format(
                    'update game_instances set words = ?, word_group = ?, score = ?, last_query = ? where game_id = ?',
                    [wordsStr, '', scoreStr, lastQuery, gameId]
                )
            );

            return { status: SUCCESS, bundle: '', words: words, score: score };
        } else {
            return { status: FAIL, error: 'To play using custom words you must have entered 25 successfully.' };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not generate a game using custom words.' };
    }
};
