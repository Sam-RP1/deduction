import * as actionTypes from '../actions/actionTypes';

const initialState = {
    joinLink: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_STATE:
            return {
                joinLink: false,
            };
        default:
            return state;
    }
};

export default reducer;
