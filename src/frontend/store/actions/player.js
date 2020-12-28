import * as actionTypes from './actionTypes';

export const setPlayerId = (id) => {
    return {
        type: actionTypes.SET_PLAYER_ID,
        payload: { id: id },
    };
};

export const setPlayerName = (name) => {
    return {
        type: actionTypes.SET_PLAYER_NAME,
        payload: { name: name },
    };
};

export const setTeamAC = (team) => {
    return { type: actionTypes.SET_PLAYER_TEAM, payload: { team: team } };
};

export const setRoleAC = (role) => {
    return { type: actionTypes.SET_PLAYER_ROLE, payload: { role: role } };
};

export const resetPlayerAC = () => {
    return { type: actionTypes.RESET_PLAYER };
};
