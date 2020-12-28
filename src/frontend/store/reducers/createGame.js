import * as actionTypes from '../actions/actionTypes';

const initialState = {
    gameName: '',
    gamePassword: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CREATE_GAME_STATE:
            return {
                gameName: action.payload.gameName,
                gamePassword: action.payload.gamePassword,
            };
        case actionTypes.RESET_CREATE_GAME_STATE:
            return {
                gameName: '',
                gamePassword: '',
            };
        default:
            return state;
    }
};

export default reducer;
