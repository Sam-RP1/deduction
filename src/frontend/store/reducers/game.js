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
        case actionTypes.NEW_GAME_SETTINGS: {
            const gameSettings = action.payload.gameSettings;
            return {
                ...state,
                words: gameSettings.words,
                gameTimer: gameSettings.gameTimer,
                guessesBlue: gameSettings.guessesBlue,
                guessesRed: gameSettings.guessesRed,
                lastQuery: gameSettings.lastQuery,
                score: gameSettings.score,
                turn: gameSettings.turn,
            };
        }
        case actionTypes.CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'red' ? 'blue' : 'red',
            };
        case actionTypes.SET_TEAM:
            return {
                ...state,
                team: action.payload.team,
            };
        case actionTypes.SET_ROLE:
            return {
                ...state,
                role: action.payload.role,
            };
        case actionTypes.ADD_GUESS_BLUE:
            return {
                ...state,
                guessesBlue: state.guessesBlue.concat(action.payload.guess),
            };
        case actionTypes.ADD_GUESS_RED:
            return {
                ...state,
                guessesRed: state.guessesRed.concat(action.payload.guess),
            };
        default:
            return state;
    }
};

export default reducer;
