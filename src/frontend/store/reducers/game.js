import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: null, // The games id
    password: null, // The games password
    blueTeam: [], // The players on the blue team
    redTeam: [], // The players on the red team
    unassigned: [], // The players not on a team
    score: {
        blue: null,
        red: null,
    }, // The games score
    wordGroups: [], // The selectable word groups
    wordGroup: null, // The games selected word group if applicable
    customWords: [], // The games custom words if applicable
    words: [], // The games words generated from the selected word group
    turn: null, // The games turn based on teams
    guessesBlue: [], // MAYBE REMOVE
    guessesRed: [], // MAYBE REMOVE
    quickGame: false, // Not implemented
    turnTimer: false, // Not implemented
    gameTimer: 0, // Not implemented
};

const generateTeams = (players = []) => {
    const blueTeam = [];
    const redTeam = [];
    const unassigned = [];

    for (let i = 0; i < players.length; i++) {
        if (players[i].team === 'blue') {
            blueTeam.push(players[i]);
        } else if (players[i].team === 'red') {
            redTeam.push(players[i]);
        } else {
            unassigned.push(players[i]);
        }
    }

    return { blueTeam, redTeam, unassigned };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_SETTINGS: {
            const gameSettings = action.payload.gameSettings;
            const { blueTeam, redTeam, unassigned } = generateTeams(gameSettings.players);
            return {
                ...state,
                id: gameSettings.gameId,
                password: gameSettings.gamePassword,
                blueTeam: blueTeam,
                redTeam: redTeam,
                unassigned: unassigned,
                score: gameSettings.score,
                wordGroups: gameSettings.wordGroups,
                wordGroup: gameSettings.wordGroup,
                customWords: gameSettings.customWords,
                words: gameSettings.words,
                turn: gameSettings.turn,
                guessesBlue: gameSettings.guessesBlue,
                guessesRed: gameSettings.guessesRed,
                quickGame: gameSettings.quickGame,
                turnTimer: gameSettings.turnTimer,
                gameTimer: gameSettings.gameTimer,
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
        case actionTypes.RESET_GAME:
            return {
                id: null,
                password: null,
                blueTeam: [],
                redTeam: [],
                unassigned: [],
                score: {
                    blue: null,
                    red: null,
                },
                wordGroups: [],
                wordGroup: null,
                customWords: [],
                words: [],
                turn: null,
                guessesBlue: [],
                guessesRed: [],
                quickGame: false,
                turnTimer: false,
                gameTimer: 0,
            };
        case actionTypes.SET_TEAMS: {
            const { blueTeam, redTeam, unassigned } = generateTeams(action.payload.players);
            return {
                ...state,
                blueTeam: blueTeam,
                redTeam: redTeam,
                unassigned: unassigned,
            };
        }
        case actionTypes.SET_ROLES: {
            const { blueTeam, redTeam, unassigned } = generateTeams(action.payload.players);
            return {
                ...state,
                blueTeam: blueTeam,
                redTeam: redTeam,
                unassigned: unassigned,
            };
        }
        case actionTypes.SET_WORD_BUNDLE:
            return {
                ...state,
                wordGroup: action.payload.bundle,
            };
        case actionTypes.SET_WORDS:
            return {
                ...state,
                words: action.payload.words,
            };
        case actionTypes.SET_GAME_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            };
        case actionTypes.SET_TURN:
            // remove hardcoded approach and use payload
            return {
                ...state,
                turn: state.turn === 'red' ? 'blue' : 'red',
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
