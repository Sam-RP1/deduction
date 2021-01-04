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
    wordBundles: [], // The selectable word groups
    wordBundle: '', // The games selected word group if applicable
    customWords: [], // The games custom words if applicable
    words: [], // The games words generated from the selected word group
    turn: null, // The games turn based on teams
    quickGame: false, // Not implemented
    turnTimer: false, // Not implemented
    gameTimer: 0, // Not implemented
    error: null, // An error recieved from the svr as the result of an action
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
        case actionTypes.SET_GAME_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
            };
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
                wordBundles: gameSettings.wordGroups,
                wordBundle: gameSettings.wordGroup,
                customWords: gameSettings.customWords,
                words: gameSettings.words,
                turn: gameSettings.turn,
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
                lastQuery: gameSettings.lastQuery,
                score: gameSettings.score,
                turn: gameSettings.turn,
            };
        }
        case actionTypes.NEW_GAME: {
            const newGame = action.payload.data;
            return {
                ...state,
                score: newGame.score,
                words: newGame.words,
                turn: newGame.turn,
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
                wordBundles: [],
                wordBundle: '',
                customWords: [],
                words: [],
                turn: null,
                quickGame: false,
                turnTimer: false,
                gameTimer: 0,
                error: null,
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
        case actionTypes.SET_TURN:
            return {
                ...state,
                turn: action.payload.turn,
            };
        case actionTypes.SET_SCORE:
            return {
                ...state,
                score: action.payload.score,
            };
        case actionTypes.SET_WORD_BUNDLE:
            return {
                ...state,
                wordBundle: action.payload.bundle,
            };
        case actionTypes.SET_CUSTOM_WORDS:
            return {
                ...state,
                customWords: action.payload.words,
            };
        case actionTypes.SET_WORDS:
            return {
                ...state,
                words: action.payload.words,
            };
        case actionTypes.SET_GAME_ERROR:
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default reducer;
