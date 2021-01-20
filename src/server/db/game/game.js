'use strict';
const { SUCCESS, FAIL, ERROR, EXISTS, EMPTY } = require('../../statusTypes');
const { generateWords, sqlPromise, logError } = require('../../config');
const { parseGameData } = require('../config');

module.exports.checkNumGames = async () => {
    try {
        const sql = await sqlPromise;
        const maxNumGames = 500;
        const [games] = await sql.query(sql.format('select game_id from game_instances'));

        const ans = games.length < maxNumGames ? { status: SUCCESS } : { status: FAIL };

        return ans;
    } catch (e) {
        logError(e);
        return { status: ERROR, error: e };
    }
};

module.exports.checkGameId = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));

        const ans = result.length > 0 ? { status: EXISTS } : { status: EMPTY };

        return ans;
    } catch (e) {
        logError(e);
        return { status: ERROR, error: e };
    }
};

module.exports.createGame = async (gameData) => {
    try {
        const sql = await sqlPromise;
        const gameId = gameData.gameId;
        const created = Date.now();

        const newGame = {
            created: created,
            game_id: gameData.gameId,
            game_password: gameData.gamePassword,
            players: JSON.stringify([]),
            score: JSON.stringify({ blue: 8, red: 9 }),
            word_group: '',
            custom_words: JSON.stringify([]),
            words: JSON.stringify([]),
            turn: 'red',
            quick_game: false,
            turn_timer: false,
            game_timer: 0,
            last_query: created,
        };

        await sql.query(sql.format('INSERT INTO game_instances SET ?', newGame));

        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));

        if (result.length > 0) {
            const parsedData = await parseGameData(result[0]);
            return {
                status: SUCCESS,
                data: parsedData,
            };
        } else {
            return {
                status: FAIL,
                msg: 'Game was either not created, created incorrectly or the query to find game after creation failed',
            };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: e };
    }
};

module.exports.getGame = async (gameId, gamePassword) => {
    try {
        const sql = await sqlPromise;

        const [result] = await sql.query(
            sql.format('select * from game_instances where game_id = ? and game_password = ?', [gameId, gamePassword])
        );

        if (result.length > 0) {
            const parsedData = await parseGameData(result[0]);
            return {
                status: SUCCESS,
                data: parsedData,
            };
        } else {
            return {
                status: FAIL,
                msg:
                    'Either a game with the entered gameId / game name does not exist or the entered gamePassword / game password is incorrect',
            };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: e };
    }
};

module.exports.newGame = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [result] = await sql.query(
            sql.format('select word_group, custom_words from game_instances where game_id = ?', [gameId])
        );
        const gameData = result[0];
        const wordBundleId = gameData.word_group;
        const customWords = JSON.parse(gameData.custom_words);

        if (wordBundleId !== '' || customWords.length === 25) {
            const words =
                wordBundleId === '' ? await generateWords(customWords, true) : await generateWords(wordBundleId, false);

            const newGame = {
                score: { blue: 8, red: 9 },
                words: words,
                turn: 'red',
            };

            const score = JSON.stringify(newGame.score);
            const wordsStr = JSON.stringify(newGame.words);
            const turn = newGame.turn;
            const lastQuery = Date.now();

            await sql.query(
                sql.format(
                    'update game_instances set score = ?, words = ?, turn = ?, last_query = ? where game_id = ?',
                    [score, wordsStr, turn, lastQuery, gameId]
                )
            );

            return { status: SUCCESS, data: newGame };
        } else {
            return {
                status: FAIL,
                error:
                    'To create a new game you must either select a word bundle or currently have 25 custom words entered',
            };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not generate a fresh game.' };
    }
};

module.exports.updateGuess = async (gameId, word, playerTeam, playerRole, isGuessed) => {
    try {
        const sql = await sqlPromise;
        const [gameData] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));
        const parsedData = await parseGameData(gameData[0]);

        if (playerTeam === parsedData.turn && playerRole === 'agent' && isGuessed === false) {
            const words = parsedData.words;
            const score = parsedData.score;
            let nextTurn = null;

            const wordIndex = word.index;
            words[wordIndex].guessData.isGuessed = true;
            words[wordIndex].guessData.team = playerTeam;

            if (word.denomination === 'blue' && playerTeam === 'blue') {
                score.blue += -1;
            } else if (word.denomination === 'blue' && playerTeam === 'red') {
                score.blue += -1;
                nextTurn = 'blue';
            } else if (word.denomination === 'red' && playerTeam === 'red') {
                score.red += -1;
            } else if (word.denomination === 'red' && playerTeam === 'blue') {
                score.red += -1;
                nextTurn = 'red';
            } else if (word.denomination === 'blank') {
                nextTurn = playerTeam === 'blue' ? 'red' : 'blue';
            } else {
                playerTeam === 'blue' ? (score.red = 0) : (score.blue = 0);
            }

            const wordsStr = JSON.stringify(words);
            const scoreStr = JSON.stringify(score);
            const lastQuery = Date.now();

            if (nextTurn !== null) {
                await sql.query(
                    sql.format(
                        'update game_instances set words = ?, score = ?, turn = ?, last_query = ? where game_id = ?',
                        [wordsStr, scoreStr, nextTurn, lastQuery, gameId]
                    )
                );
            } else {
                await sql.query(
                    sql.format('update game_instances set words = ?, score = ?, last_query = ? where game_id = ?', [
                        wordsStr,
                        scoreStr,
                        lastQuery,
                        gameId,
                    ])
                );
            }

            return { status: SUCCESS, data: { words: words, score: score, nextTurn: nextTurn } };
        } else {
            return {
                status: FAIL,
                error:
                    'You can only make a guess if it is your teams turn, you are an agent and if the word has not already been guessed',
            };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not process the guess.' };
    }
};

module.exports.updateTurn = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [turn] = await sql.query(sql.format('select turn from game_instances where game_id = ?', [gameId]));
        const currentTurn = turn[0].turn;
        const nextTurn = currentTurn === 'blue' ? 'red' : 'blue';
        const lastQuery = Date.now();

        await sql.query(
            sql.format('update game_instances set turn = ?, last_query = ? where game_id = ?', [
                nextTurn,
                lastQuery,
                gameId,
            ])
        );

        return { status: SUCCESS, nextTurn: nextTurn };
    } catch (e) {
        logError(e);
        return {
            status: ERROR,
            error: 'Could not update the games turn.',
        };
    }
};

module.exports.prune = async () => {
    try {
        const sql = await sqlPromise;
        const [allGames] = await sql.query(sql.format('select game_id, last_query from game_instances'));

        const lastHour = Date.now() - 3600000;

        for (let i = 0; i < allGames.length; i++) {
            if (allGames[i].last_query < lastHour) {
                await sql.query(sql.format('delete from game_instances where game_id = ?', [allGames[i].game_id]));
            }
        }

        return { status: SUCCESS };
    } catch (e) {
        logError(e);
        return {
            status: ERROR,
            error: 'Could not prune game instances.',
        };
    }
};
