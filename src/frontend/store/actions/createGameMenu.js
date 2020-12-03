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

export const submitAction = (data) => {
    return { type: actionTypes.SET_GAME_SETTINGS, payload: { gameData: data } };
};

export const submit = () => async (dispatch, getState) => {
    const cgmData = getState().cgm;
    dispatch(submitAction(cgmData));
    dispatch(resetState());
};

export const resetState = () => {
    return { type: actionTypes.RESET_STATE };
};
