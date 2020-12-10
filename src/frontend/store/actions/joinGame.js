import * as actionTypes from './actionTypes';

export const joinGameAction = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const joinGame = (gameId) => async (dispatch) => {
    const url = 'https://us-central1-deduction-158f9.cloudfunctions.net/deduction/join/' + gameId;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    console.log(data);
    dispatch(joinGameAction(data));
};
