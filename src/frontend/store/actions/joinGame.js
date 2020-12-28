import * as actionTypes from './actionTypes';

export const joinGameAC = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const joinGame = (data) => async (dispatch) => {
    const url = 'http://localhost:4000/api/game/' + data.gameId + '/' + data.gamePassword;
    const response = await fetch(url, { method: 'GET' });
    const resData = await response.json();

    if (resData.status === 'success') {
        dispatch(joinGameAC(resData.data));
        return { status: resData.status };
    } else {
        return { status: resData.status, msg: resData.msg };
    }
};
