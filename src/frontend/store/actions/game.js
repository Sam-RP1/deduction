import * as actionTypes from './actionTypes';

export const setGameSettings = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const newGameSettings = (data) => {
    return { type: actionTypes.NEW_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const newGame = () => async (dispatch, getState) => {
    const gameId = getState().game.id;

    const url = 'https://us-central1-deduction-158f9.cloudfunctions.net/deduction/create/refresh';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            gameId: gameId,
        }),
    });
    const data = await response.json();
    console.log(data);
    dispatch(newGameSettings(data));
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

export const updateTurn = (turn) => {
    return { type: actionTypes.END_TURN, payload: { turn: turn } };
};

export const endTurn = () => async (dispatch, getState) => {
    const turn = getState().game.turn;
    const gameId = getState().game.id;
    const url = 'https://us-central1-deduction-158f9.cloudfunctions.net/deduction/create/refresh';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            gameId: gameId,
        }),
    });
    const data = await response.json();
    console.log('test', data);
    dispatch(updateTurn(turn));
};
