import * as actionTypes from '../actions';

const initialState = {
    turnTimer: false,
    quickGame: false,
    wordGroup: null,
    customWords: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_TURN_TIMER:
            return {
                ...state,
                turnTimer: !state.turnTimer,
            };
        case actionTypes.TOGGLE_QUICK_GAME:
            return {
                ...state,
                quickGame: !state.quickGame,
            };
        case actionTypes.SELECT_WORD_GROUP:
            return {
                ...state,
                wordGroup: action.payload.selectedWordGroup,
            };
        case actionTypes.UPDATE_CUSTOM_WORDS:
            return {
                ...state,
                customWords: action.payload.words,
            };
        default:
            return state;
    }
};

export default reducer;
