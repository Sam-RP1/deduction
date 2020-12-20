import * as actionTypes from './actionTypes';

export const submitAction = (data) => {
    return {
        type: actionTypes.SET_CREATE_GAME_STATE,
        payload: { gameName: data.gameName, gamePassword: data.gamePassword, playerName: data.playerName },
    };
};

// Get socket id, send playerName: { socketId: playersNameHere }
export const submit = (data) => async (dispatch) => {
    const url = 'http://localhost:4000/api/game';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            gameName: data.gameName,
            gamePassword: data.gamePassword,
            playerName: data.playerName,
        }),
    });
    const res = await response.json();
    console.log(res);
    dispatch(submitAction(data));
};
