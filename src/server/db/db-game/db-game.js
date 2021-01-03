'use strict';
const _ = require('underscore');
const config = require('../../config/config');
const { SUCCESS, FAIL, ERROR, EXISTS, EMPTY } = require('../../config/statusTypes');
const { generateWords } = require('../../config/config');
const sqlPromise = config.sqlPromise;
const logError = config.logError;

// TODO: Split into seperate files for each different type

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

// Game
// Is there an error here if I have 25 words and a bundle selected?
// Or if i have custom words playing, then have 24 and then have bundle selected?
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
            const words = wordBundleId === '' ? generateWords(customWords, true) : generateWords(wordBundleId, false);

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

// Add player
module.exports.addPlayer = async (gameId, playerId, playerName) => {
    try {
        const sql = await sqlPromise;
        const [players] = await sql.query(sql.format('select players from game_instances where game_id = ?', [gameId]));

        const playerArr = JSON.parse(players[0].players);

        const newPlayer = [
            {
                playerId: playerId,
                playerName: playerName,
                team: null,
                role: null,
            },
        ];

        const updatedPlayerArr = playerArr.concat(newPlayer);
        const updatedPlayerStr = JSON.stringify(updatedPlayerArr);

        await sql.query(
            sql.format('update game_instances set players = ? where game_id = ?', [updatedPlayerStr, gameId])
        );

        return { status: SUCCESS, players: updatedPlayerArr };
    } catch (e) {
        logError(e);
        return {
            status: ERROR,
            error: 'A player has attempted to join the game, but they were not successfully added.',
        };
    }
};

// Remove player
// could use filter
module.exports.removePlayer = async (gameId, playerId) => {
    try {
        const sql = await sqlPromise;
        const [players] = await sql.query(sql.format('select players from game_instances where game_id = ?', [gameId]));
        const playerArr = JSON.parse(players[0].players);

        for (let i = 0; i < playerArr.length; i++) {
            if (playerArr[i].playerId === playerId) {
                playerArr.splice(i, 1);
                break;
            }
        }

        const updatedPlayerStr = JSON.stringify(playerArr);

        await sql.query(
            sql.format('update game_instances set players = ? where game_id = ?', [updatedPlayerStr, gameId])
        );

        return { status: SUCCESS, players: playerArr };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not remove a player who has left the game.' };
    }
};

// Update team
// add if else for fail conditions
// could use filter
module.exports.updateTeams = async (gameId, playerId, team) => {
    try {
        const sql = await sqlPromise;
        const [players] = await sql.query(sql.format('select players from game_instances where game_id = ?', [gameId]));
        const playerArr = JSON.parse(players[0].players);

        for (let i = 0; i < playerArr.length; i++) {
            if (playerArr[i].playerId === playerId) {
                playerArr[i].team = team;
                break;
            }
        }

        const updatedPlayerStr = JSON.stringify(playerArr);

        await sql.query(
            sql.format('update game_instances set players = ? where game_id = ?', [updatedPlayerStr, gameId])
        );

        return { status: SUCCESS, players: playerArr };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not change your team.' };
    }
};

// Randomise teams
module.exports.randomiseTeams = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [players] = await sql.query(sql.format('select players from game_instances where game_id = ?', [gameId]));

        const playerArr = JSON.parse(players[0].players);
        const numPlayers = playerArr.length;
        const isEvenPlayers = numPlayers % 2 === 0 ? true : false;
        const shuffledPlayers = _.shuffle(playerArr);

        const firstHalf = Math.floor(numPlayers / 2);
        for (let i = 0; i < firstHalf; i++) {
            shuffledPlayers[i].team = 'red';
        }

        const lastHalf = firstHalf * 2;
        for (let i = firstHalf; i < lastHalf; i++) {
            shuffledPlayers[i].team = 'blue';
        }

        if (isEvenPlayers === false) {
            const ans = Math.random() > 0.5 ? 'blue' : 'red';
            shuffledPlayers[numPlayers - 1].team = ans;
        }

        const updatedPlayerStr = JSON.stringify(shuffledPlayers);

        await sql.query(
            sql.format('update game_instances set players = ? where game_id = ?', [updatedPlayerStr, gameId])
        );

        return { status: SUCCESS, players: shuffledPlayers };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not randomise teams.' };
    }
};

// Update a players role
// Add check for if role == currentrole
// maybe use filter
module.exports.updatePlayerRole = async (gameId, playerId, role) => {
    try {
        const sql = await sqlPromise;
        const [players] = await sql.query(sql.format('select players from game_instances where game_id = ?', [gameId]));
        const playerArr = JSON.parse(players[0].players);

        for (let i = 0; i < playerArr.length; i++) {
            if (playerArr[i].playerId === playerId) {
                playerArr[i].role = role;
                break;
            }
        }

        const updatedPlayerStr = JSON.stringify(playerArr);

        await sql.query(
            sql.format('update game_instances set players = ? where game_id = ?', [updatedPlayerStr, gameId])
        );

        return { status: SUCCESS, players: playerArr };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not update your role.' };
    }
};

// Update word bundle
module.exports.updateWordBundle = async (gameId, bundleId) => {
    try {
        const sql = await sqlPromise;
        const words = generateWords(bundleId, false);
        const wordsStr = JSON.stringify(words);

        await sql.query(
            sql.format('update game_instances set word_group = ?, words = ? where game_id = ?', [
                bundleId,
                wordsStr,
                gameId,
            ])
        );

        return { status: SUCCESS, wordBundle: bundleId, words: words };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not select word bundle.' };
    }
};

// Add a custom word
module.exports.addCustomWord = async (gameId, word) => {
    try {
        const sql = await sqlPromise;
        const [customWordsRes] = await sql.query(
            sql.format('select custom_words from game_instances where game_id = ?', [gameId])
        );
        const customWords = JSON.parse(customWordsRes[0].custom_words);

        customWords.push(word);
        const customWordsStr = JSON.stringify(customWords);

        await sql.query(
            sql.format('update game_instances set custom_words = ? where game_id = ?', [customWordsStr, gameId])
        );

        return { status: SUCCESS, customWords: customWords };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not add custom word.' };
    }
};

// Remove a custom word
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

        await sql.query(
            sql.format('update game_instances set custom_words = ? where game_id = ?', [customWordsStr, gameId])
        );

        return { status: SUCCESS, customWords: customWords };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not remove custom word.' };
    }
};

// Use custom words
module.exports.useCustomWords = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [result] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));
        const parsedData = await parseGameData(result[0]);
        const customWords = parsedData.customWords;

        if (customWords.length === 25) {
            const words = generateWords(customWords, true);
            const wordsStr = JSON.stringify(words);

            await sql.query(
                sql.format('update game_instances set words = ?, word_group = ? where game_id = ?', [
                    wordsStr,
                    '',
                    gameId,
                ])
            );

            return { status: SUCCESS, bundle: '', words: words };
        } else {
            return { status: FAIL, error: 'To play using custom words you must have entered 25 successfully.' };
        }
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not generate a game using custom words.' };
    }
};

// Guess has been made
module.exports.updateGuess = async (gameId, word, playerTeam, playerRole, isGuessed) => {
    try {
        const sql = await sqlPromise;
        const [gameData] = await sql.query(sql.format('select * from game_instances where game_id = ?', [gameId]));
        const parsedData = parseGameData(gameData[0]);

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

            if (nextTurn !== null) {
                await sql.query(
                    sql.format('update game_instances set words = ?, score = ?, turn = ? where game_id = ?', [
                        wordsStr,
                        scoreStr,
                        nextTurn,
                        gameId,
                    ])
                );
            } else {
                await sql.query(
                    sql.format('update game_instances set words = ?, score = ? where game_id = ?', [
                        wordsStr,
                        scoreStr,
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

// Update the turn for a game
module.exports.updateTurn = async (gameId) => {
    try {
        const sql = await sqlPromise;
        const [turn] = await sql.query(sql.format('select turn from game_instances where game_id = ?', [gameId]));
        const currentTurn = turn[0].turn;

        const nextTurn = currentTurn === 'blue' ? 'red' : 'blue';

        await sql.query(sql.format('update game_instances set turn = ? where game_id = ?', [nextTurn, gameId]));

        return { status: SUCCESS, nextTurn: nextTurn };
    } catch (e) {
        logError(e);
        return {
            status: ERROR,
            error: 'Could not update the games turn.',
        };
    }
};

// General functions
const parseGameData = (gameData) => {
    gameData.quick_game = gameData.quick_game === 1 ? true : false;
    gameData.turn_timer = gameData.turn_timer === 1 ? true : false;

    const data = {
        gameId: gameData.game_id,
        gamePassword: gameData.game_password,
        players: JSON.parse(gameData.players),
        score: JSON.parse(gameData.score),
        wordGroup: gameData.word_group,
        customWords: JSON.parse(gameData.custom_words),
        words: JSON.parse(gameData.words),
        turn: gameData.turn,
        quickGame: gameData.quick_game,
        turnTimer: gameData.turn_timer,
        gameTimer: gameData.game_timer,
    };

    return data;
};
