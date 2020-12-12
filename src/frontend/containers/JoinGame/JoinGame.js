import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux Action Types
import * as jg from '../../store/actions/joinGame';

// Presentational Components
import JoinGameCmpnt from '../../components/Menus/JoinGame/JoinGame';

// Container Component
const JoinGame = () => {
    // Redux Actions
    const dispatch = useDispatch();
    const joinGame = useCallback((gameId) => dispatch(jg.joinGame(gameId)), [dispatch]);

    // Local State
    const [joinCode, setJoinCode] = useState('');
    const [submitErrMsg, setSubmitErrMsg] = useState(null);

    // Vars
    const history = useHistory();

    // Functions
    const getEnteredCode = (evt) => {
        const code = evt.target.value;
        setJoinCode(code);
    };

    const submitHandler = () => {
        console.log('contains', joinCode.search('^[A-Za-z0-9-]+$'));
        if (joinCode.length === 36 && joinCode.search('^[A-Za-z0-9-]+$') > -1) {
            joinGame(joinCode);
            history.push('/game');
        } else {
            let errString = 'Invalid join code';
            let optClass = 'err-msg--inherit err-msg--mw300px';
            setSubmitErrMsg(errGenerator(errString, optClass, setSubmitErrMsg));
        }
    };

    const errGenerator = (errString, optClass, callback) => {
        return (
            <p
                className={'err-msg ' + optClass}
                onClick={() => {
                    callback(null);
                }}
            >
                ERROR: {errString} - CLICK TO DISMISS &#10006;
            </p>
        );
    };

    // Render
    return <JoinGameCmpnt enterCode={getEnteredCode} submitHandler={submitHandler} submitErrMsg={submitErrMsg} />;
};

export default JoinGame;
