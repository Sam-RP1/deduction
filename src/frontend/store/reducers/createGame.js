import * as actionTypes from '../actions/actionTypes';

const initialState = {
    turnTimer: false,
    quickGame: false,
    wordGroup: '',
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
        case actionTypes.ADD_CUSTOM_WORD:
            return {
                ...state,
                customWords: state.customWords.concat(action.payload.word),
            };
        case actionTypes.DELETE_CUSTOM_WORD: {
            const newCustomWords = state.customWords.filter((word) => word !== action.payload.word);
            return {
                ...state,
                customWords: newCustomWords,
            };
        }
        case actionTypes.RESET_STATE:
            return {
                turnTimer: false,
                quickGame: false,
                wordGroup: '',
                customWords: [],
            };
        default:
            return state;
    }
};

export default reducer;
