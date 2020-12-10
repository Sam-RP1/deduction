import * as actionTypes from './actionTypes';

export const toggleTurnTimer = () => {
    return { type: actionTypes.TOGGLE_TURN_TIMER };
};

export const toggleQuickGame = () => {
    return { type: actionTypes.TOGGLE_QUICK_GAME };
};

export const selectWordGroup = (id) => {
    return { type: actionTypes.SELECT_WORD_GROUP, payload: { selectedWordGroup: id } };
};

export const addCustomWord = (word) => {
    return { type: actionTypes.ADD_CUSTOM_WORD, payload: { word: word } };
};

export const deleteCustomWord = (word) => {
    return { type: actionTypes.DELETE_CUSTOM_WORD, payload: { word: word } };
};

export const resetCreateGameState = () => {
    return { type: actionTypes.RESET_CREATE_GAME_STATE };
};

export const submitAction = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameSettings: data } };
};

export const submit = () => async (dispatch, getState) => {
    const cgmData = getState().cgm;

    const url = 'https://us-central1-deduction-158f9.cloudfunctions.net/deduction/create';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            turnTimer: cgmData.turnTimer,
            quickGame: cgmData.quickGame,
            wordGroup: cgmData.wordGroup,
            customWords: cgmData.customWords,
        }),
    });
    const data = await response.json();
    console.log(data);
    dispatch(submitAction(data));
    dispatch(resetCreateGameState());
};
