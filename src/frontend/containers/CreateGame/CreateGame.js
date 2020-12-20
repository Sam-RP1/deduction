import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Redux Action Types
import * as cg from '../../store/actions/createGame';

// Presentational Components
import CreateGameCmpnt from '../../components/Menus/CreateGame/CreateGame';

// Other
import useError from '../useError';

// Container Component
const CreateGame = (props) => {
    // Redux Actions
    const dispatch = useDispatch();
    const submitNewGame = useCallback((data) => dispatch(cg.submit(data)), [dispatch]);

    // State
    const [gameNameError, setGameNameError] = useState(null); // eslint-disable-line
    const [gamePasswordError, setGamePasswordError] = useState(null); // eslint-disable-line
    const [playerNameError, setPlayerNameError] = useState(null); // eslint-disable-line

    // Vars & Refs
    const history = useHistory(); // eslint-disable-line
    const gameNameInput = useRef();
    const gamePasswordInput = useRef();
    const playerNameInput = useRef();

    // Other
    const { checkInput } = useError(); // eslint-disable-line

    // Functions
    const submitHandler = async () => {
        const gameName = gameNameInput.current.value;
        const gamePassword = gamePasswordInput.current.value;
        const playerName = playerNameInput.current.value;

        const gameNameRes = await checkInput(gameNameError, gameName, 'game name', setGameNameError);
        const gamePasswordRes = await checkInput(
            gamePasswordError,
            gamePassword,
            'game password',
            setGamePasswordError
        );
        const playerNameRes = await checkInput(playerNameError, playerName, 'player name', setPlayerNameError);

        if (gameNameRes === true && gamePasswordRes === true && playerNameRes === true) {
            const data = { gameName: gameName, gamePassword: gamePassword, playerName: playerName };
            submitNewGame(data);
            history.push('/game');
            props.sendUpdate();
        }
    };

    // Render
    return (
        <CreateGameCmpnt
            gameNameRef={gameNameInput}
            gamePasswordRef={gamePasswordInput}
            playerNameRef={playerNameInput}
            gameNameError={gameNameError}
            gamePasswordError={gamePasswordError}
            playerNameError={playerNameError}
            submitHandler={submitHandler}
        />
    );
};

CreateGame.propTypes = {
    sendUpdate: PropTypes.func,
};

CreateGame.defaultProps = {};

export default CreateGame;
