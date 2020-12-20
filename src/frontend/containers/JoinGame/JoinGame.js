import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux Action Types
import * as jg from '../../store/actions/joinGame';

// Presentational Components
import JoinGameCmpnt from '../../components/Menus/JoinGame/JoinGame';

// Other
import useError from '../useError';

// Container Component
const JoinGame = () => {
    // Redux Actions
    const dispatch = useDispatch();
    const joinGame = useCallback((gameId) => dispatch(jg.joinGame(gameId)), [dispatch]); // eslint-disable-line

    // State
    const [joinLinkError, setJoinLinkError] = useState(null);
    const [playerNameError, setPlayerNameError] = useState(null);

    // Vars & Refs
    const history = useHistory();
    const joinLinkInput = useRef();
    const playerNameInput = useRef();

    // Other
    const { checkInput, checkJoinLink } = useError(); // eslint-disable-line

    // Functions
    const submitHandler = async () => {
        const joinLink = joinLinkInput.current.value;
        const playerName = playerNameInput.current.value;

        const joinLinkRes = await checkJoinLink(joinLinkError, joinLink, setJoinLinkError);
        const playerNameRes = await checkInput(playerNameError, playerName, 'player name', setPlayerNameError);

        if (joinLinkRes === true && playerNameRes === true) {
            // const data = { joinLink: joinLink, playerName: playerName };
            history.push('/game');
        }
    };

    // Render
    return (
        <JoinGameCmpnt
            joinLinkRef={joinLinkInput}
            playerNameRef={playerNameInput}
            joinLinkError={joinLinkError}
            playerNameError={playerNameError}
            submitHandler={submitHandler}
        />
    );
};

export default JoinGame;
