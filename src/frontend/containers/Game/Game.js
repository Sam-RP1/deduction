import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Presentational Components
import GameCmpnt from '../../components/Game/Game';

// Other
import useGame from '../../hooks/useGame';
import useError from '../../hooks/useError';

// Container Component
const Game = (props) => {
    // Redux Selectors
    // Player
    const playerName = useSelector((state) => state.player.name);
    const playerTeam = useSelector((state) => state.player.team);
    const playerRole = useSelector((state) => state.player.role);
    // Game
    const gameId = useSelector((state) => state.game.id);
    const gamePassword = useSelector((state) => state.game.password);
    const blueTeam = useSelector((state) => state.game.blueTeam);
    const redTeam = useSelector((state) => state.game.redTeam);
    const unassigned = useSelector((state) => state.game.unassigned);
    const score = useSelector((state) => state.game.score);
    const turn = useSelector((state) => state.game.turn);
    const wordBundles = useSelector((state) => state.game.wordBundles);
    const wordBundle = useSelector((state) => state.game.wordBundle);
    const wordsArr = useSelector((state) => state.game.words);
    const customWords = useSelector((state) => state.game.customWords);
    const gameErrorStr = useSelector((state) => state.game.error);

    // State
    const [isGameOver, setIsGameOver] = useState(null);
    const [joinCode, setJoinCode] = useState(null);
    const [customWordError, setCustomWordError] = useState(null);
    const [gameError, setGameError] = useState(null);

    // Vars
    const {
        joinGame,
        newGame,
        selectTeam,
        randomiseTeams,
        selectRole,
        selectWordBundle,
        addCustomWord,
        removeCustomWord,
        useCustomWords,
        guess,
        endTurn,
    } = useGame(props.socketRef, gameId);
    const { generateError } = useError();

    // useEffects
    useEffect(() => {
        joinGame(gameId, playerName);
        setJoinCode('gameId=' + gameId + ',gamePassword=' + gamePassword);
    }, [gameId, gamePassword]);

    useEffect(() => {
        if (score.blue === 0) {
            setIsGameOver('blue');
        } else if (score.red === 0) {
            setIsGameOver('red');
        } else {
            setIsGameOver(null);
        }
    }, [score.red, score.blue]);

    useEffect(() => {
        if (gameErrorStr !== null) {
            setGameError(generateError([gameErrorStr], 'err-msg--fw100prcnt', setGameError));
        }
    }, [gameErrorStr]);

    // Functions
    const addCustomWordHandler = useCallback(
        (evt) => {
            const enteredString = evt.target.value;
            const pattern = new RegExp('[^A-Za-z0-9]');
            const exists = customWords.indexOf(enteredString);
            let stringFail = false;

            if (enteredString.search(pattern) > -1) {
                stringFail = true;
            }

            if (
                enteredString.length > 1 &&
                enteredString.length < 41 &&
                customWords.length < 25 &&
                exists === -1 &&
                stringFail === false
            ) {
                addCustomWord(enteredString);
                document.querySelector('#text-input').value = '';
            } else {
                const errors = [];
                if (stringFail === true) {
                    errors.push('Entered word cannot contain any special characters or spaces');
                }
                if (enteredString.length <= 1) {
                    errors.push('Entered word is too short! Needs to be two characters or more');
                }
                if (enteredString.length >= 41) {
                    errors.push('Entered word is too long! Needs to be forty characters or less');
                }
                if (customWords.length === 25) {
                    errors.push('25 words have been entered! To delete entered words you can click on them');
                }
                if (exists > -1) {
                    errors.push('No duplicates allowed here! This word has already been entered');
                }
                setCustomWordError(generateError(errors, null, setCustomWordError));
            }
        },
        [customWords]
    );

    // Render
    return (
        <GameCmpnt
            newGame={newGame}
            joinCode={joinCode}
            endTurn={endTurn}
            score={score}
            turn={turn}
            blueTeam={blueTeam}
            redTeam={redTeam}
            unassigned={unassigned}
            randomiseTeams={randomiseTeams}
            selectTeam={selectTeam}
            selectRole={selectRole}
            playerTeam={playerTeam}
            playerRole={playerRole}
            wordBundles={wordBundles}
            wordBundle={wordBundle}
            selectWordBundle={selectWordBundle}
            wordsArr={wordsArr}
            customWords={customWords}
            addCustomWordHandler={addCustomWordHandler}
            removeCustomWord={removeCustomWord}
            useCustomWords={useCustomWords}
            customWordError={customWordError}
            guess={guess}
            isGameOver={isGameOver}
            gameError={gameError}
        />
    );
};

Game.propTypes = {
    socketRef: PropTypes.object,
};

Game.defaultProps = {};

export default Game;
