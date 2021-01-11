'use strict';
const { SUCCESS, ERROR } = require('../../statusTypes');
const { sqlPromise, logError } = require('../../config');

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
        const lastQuery = Date.now();

        await sql.query(
            sql.format('update game_instances set players = ?, last_query = ? where game_id = ?', [
                updatedPlayerStr,
                lastQuery,
                gameId,
            ])
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
        const lastQuery = Date.now();

        await sql.query(
            sql.format('update game_instances set players = ?, last_query = ? where game_id = ?', [
                updatedPlayerStr,
                lastQuery,
                gameId,
            ])
        );

        return { status: SUCCESS, players: playerArr };
    } catch (e) {
        logError(e);
        return { status: ERROR, error: 'Could not remove a player who has left the game.' };
    }
};
