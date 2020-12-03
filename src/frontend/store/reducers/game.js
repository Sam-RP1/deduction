import * as actionTypes from '../actions/actionTypes';

const initialState = {
    score: {
        red: null,
        blue: null,
    },
    gameTime: null,
    turn: null,
    turnTimer: false,
    quickGame: false,
    joinLink: null,
    team: null,
    role: null,
    words: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_SETTINGS:
            return {
                ...initialState,
                gameSettings: action.payload.gameData,
            };
        default:
            return state;
    }
};

export default reducer;
