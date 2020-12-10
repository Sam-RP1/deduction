import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux Action Types
import * as jg from '../../store/actions/joinGame';

// Presentational Components
import JoinGameCmpnt from '../../components/Menus/JoinGame/JoinGame';

// TODO:
// Join Game Errors for input
// Refactor game and its cmpnts to also deisplay an error if the join link is invalid

const JoinGame = () => {
    // Redux Actions
    const dispatch = useDispatch();
    const joinGame = useCallback((gameId) => dispatch(jg.joinGame(gameId)), [dispatch]);

    // Local State
    const [joinCode, setJoinCode] = useState('');
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    // const [submitErrMsg, setSubmitErrMsg] = useState(null);

    // Vars
    const history = useHistory();

    // Functions
    const getEnteredCode = (evt) => {
        const code = evt.target.value;
        setJoinCode(code);
    };

    const submitHandler = () => {
        joinGame(joinCode);
        history.push('/game');
    };

    // Render
    return <JoinGameCmpnt enterLink={getEnteredCode} submitHandler={submitHandler} />;
};

export default JoinGame;
