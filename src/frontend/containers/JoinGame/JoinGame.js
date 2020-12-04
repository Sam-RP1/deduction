import React, { useCallback, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux Action Types
import * as jgm from '../../store/actions/joinGame';

// Presentational Components
import JoinGameCmpnt from '../../components/Menus/JoinGame/JoinGame';

const JoinGame = () => {
    // Local State
    const [link, setLink] = useState('');

    // Redux Actions
    const dispatch = useDispatch();
    const storeLink = useCallback((link) => dispatch(jgm.setLink(link)), [dispatch]);

    const enterLink = (evt) => {
        const enteredLink = evt.target.value;
        setLink(enteredLink);
    };

    const submitHandler = () => {
        console.log(link);
        storeLink(link);
    };

    return <JoinGameCmpnt enterLink={enterLink} submitHandler={submitHandler} />;
};

export default JoinGame;
