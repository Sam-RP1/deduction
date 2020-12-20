'use strict';

const config = require('../../config/config');
const { SUCCESS, FAIL, ERROR, EXISTS, EMPTY } = require('../../config/statusTypes');
const sqlPromise = config.sqlPromise;

module.exports.createGame = async (gameData) => {
    try {
        const sql = await sqlPromise;
        const gameId = gameData.gameId;
        const created = Date.now();

        const newGame = {
            created: created,
            game_id: gameData.gameId,
            game_password: gameData.gamePassword,
            players: JSON.stringify(gameData.players),
            score: JSON.stringify({ blue: 8, red: 9 }),
            word_group: '',
            custom_words: '',
            words: JSON.stringify({}),
            turn: 'red',
            guesses_blue: JSON.stringify({}),
            guesses_red: JSON.stringify({}),
            quick_game: false,
            turn_timer: false,
            game_timer: 0,
            last_query: created,
        };

        await sql.query(sql.format('INSERT INTO game_instances SET ?', newGame));

        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));

        if (result.length > 0) {
            const res = result[0];
            return {
                status: SUCCESS,
                data: {
                    gameId: res.game_id,
                    players: JSON.parse(res.players),
                    score: JSON.parse(res.score),
                    wordGroup: res.word_group,
                    customWords: res.custom_words,
                    words: JSON.parse(res.words),
                    turn: res.turn,
                    guessesBlue: JSON.parse(res.guesses_blue),
                    guessesRed: JSON.parse(res.guesses_red),
                    quickGame: res.quick_game,
                    turnTimer: res.turn_timer,
                    gameTimer: res.game_timer,
                },
            };
        } else {
            return {
                status: FAIL,
                msg: 'Game was either not created, created incorrectly or query to find game after creation failed',
            };
        }
    } catch (e) {
        return { status: ERROR, error: e };
    }
};

module.exports.getGame = async (gameId) => {
    try {
        const sql = await sqlPromise;

        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));

        if (result.length > 0) {
            const res = result[0];
            return {
                status: SUCCESS,
                data: {
                    gameId: res.game_id,
                    players: JSON.parse(res.players),
                    score: JSON.parse(res.score),
                    wordGroup: res.word_group,
                    customWords: res.custom_words,
                    words: JSON.parse(res.words),
                    turn: res.turn,
                    guessesBlue: JSON.parse(res.guesses_blue),
                    guessesRed: JSON.parse(res.guesses_red),
                    quickGame: res.quick_game,
                    turnTimer: res.turn_timer,
                    gameTimer: res.game_timer,
                },
            };
        } else {
            return {
                status: FAIL,
                msg: 'Game associated with gameId could not be found',
            };
        }
    } catch (e) {
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
        return { status: ERROR, error: e };
    }
};
