import * as actionTypes from '../actions/actionTypes';

const initialState = {
    created: null,
    gameTimer: null,
    guessesBlue: [],
    guessesRed: [],
    id: null,
    lastQuery: null,
    quickGame: null,
    score: {
        blue: null,
        red: null,
    },
    turn: null,
    turnTimer: false,
    team: null,
    role: null,
    words: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_SETTINGS: {
            const gameSettings = action.payload.gameSettings;
            return {
                ...state,
                created: gameSettings.created,
                gameTimer: gameSettings.gameTimer,
                id: gameSettings.id,
                lastQuery: gameSettings.lastQuery,
                quickGame: gameSettings.quickGame,
                score: gameSettings.score,
                turn: gameSettings.turn,
                turnTimer: gameSettings.turnTimer,
                words: gameSettings.words,
            };
        }
        default:
            return state;
    }
};

export default reducer;
