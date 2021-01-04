'use strict';
const { SUCCESS, ERROR } = require('../../statusTypes');
const { sqlPromise, logError } = require('../../config');

// Add check for if role == currentrole + maybe use filter
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
