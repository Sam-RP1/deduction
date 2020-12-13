import * as actionTypes from './actionTypes';

export const setGameSettings = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const setTeamAC = (team) => {
    return { type: actionTypes.SET_TEAM, payload: { team: team } };
};

export const setRoleAC = (role) => {
    return { type: actionTypes.SET_ROLE, payload: { role: role } };
};

export const addGuessBlue = (word) => {
    return { type: actionTypes.ADD_GUESS_BLUE, payload: { guess: word } };
};

export const addGuessRed = (word) => {
    return { type: actionTypes.ADD_GUESS_RED, payload: { guess: word } };
};
