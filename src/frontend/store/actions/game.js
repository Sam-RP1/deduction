import * as actionTypes from './actionTypes';

export const submitNewGameAC = (data) => {
    return {
        type: actionTypes.SET_CREATE_GAME_STATE,
        payload: { gameName: data.gameName, gamePassword: data.gamePassword },
    };
};

export const setGamePasswordAC = (password) => {
    return {
        type: actionTypes.SET_GAME_PASSWORD,
        payload: { password: password },
    };
};

export const submitNewGame = (data) => async (dispatch) => {
    const url = 'http://localhost:4000/api/game';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            gameId: data.gameId,
            gamePassword: data.gamePassword,
        }),
    });
    const resData = await response.json();

    if (resData.status === 'success') {
        dispatch(submitNewGameAC(data));
        dispatch(setGamePasswordAC(data.gamePassword));
        dispatch(setGameSettings(resData.data));
        return { status: resData.status };
    } else {
        return { status: resData.status, msg: resData.msg };
    }
};

//

export const setGameSettings = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const newGameSettings = (data) => {
    return { type: actionTypes.NEW_GAME_SETTINGS, payload: { gameSettings: data } };
};

// DONE
// Game
export const newGameAC = (data) => {
    return { type: actionTypes.NEW_GAME, payload: { data: data } };
};
// Teams
export const setTeamsAC = (players) => {
    return { type: actionTypes.SET_TEAMS, payload: { players: players } };
};
// Roles
export const setRolesAC = (players) => {
    return { type: actionTypes.SET_ROLES, payload: { players: players } };
};
// Turn
export const setTurnAC = (turn) => {
    return { type: actionTypes.SET_TURN, payload: { turn: turn } };
};
// Words
export const setWordBundleAC = (bundle) => {
    return { type: actionTypes.SET_WORD_BUNDLE, payload: { bundle: bundle } };
};
export const setWordsAC = (words) => {
    return { type: actionTypes.SET_WORDS, payload: { words: words } };
};
export const setCustomWordsAC = (words) => {
    return { type: actionTypes.SET_CUSTOM_WORDS, payload: { words: words } };
};
// Leave & Reset
export const resetGameAC = () => {
    return { type: actionTypes.RESET_GAME };
};
//

export const addGuessBlue = (word) => {
    return { type: actionTypes.ADD_GUESS_BLUE, payload: { guess: word } };
};

export const addGuessRed = (word) => {
    return { type: actionTypes.ADD_GUESS_RED, payload: { guess: word } };
};
