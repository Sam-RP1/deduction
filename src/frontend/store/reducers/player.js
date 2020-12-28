import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: null,
    name: null,
    team: null,
    role: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLAYER_ID:
            return {
                ...state,
                id: action.payload.id,
            };
        case actionTypes.SET_PLAYER_NAME:
            return {
                ...state,
                name: action.payload.name,
            };
        case actionTypes.SET_PLAYER_TEAM:
            return {
                ...state,
                team: action.payload.team,
            };
        case actionTypes.SET_PLAYER_ROLE:
            return {
                ...state,
                role: action.payload.role,
            };
        case actionTypes.RESET_PLAYER:
            return {
                ...state,
                name: null,
                team: null,
                role: null,
            };
        default:
            return state;
    }
};

export default reducer;
