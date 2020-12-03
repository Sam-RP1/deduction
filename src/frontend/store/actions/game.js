import * as actionTypes from './actionTypes';

export const setGameSettings = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};
