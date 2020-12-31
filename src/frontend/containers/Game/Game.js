import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Presentational Components
import GameCmpnt from '../../components/Game/Game';

// Other
import useGame from '../../hooks/useGame';
import useError from '../../hooks/useError';

// Container Component
const Game = (props) => {
    console.log('[GAME CONTAINER RENDER] ' + Date.now());

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
    const wordBundles = useSelector((state) => state.game.wordGroups);
    const wordBundle = useSelector((state) => state.game.wordGroup);
    const wordsArr = useSelector((state) => state.game.words);
    const score = useSelector((state) => state.game.score);
    const turn = useSelector((state) => state.game.turn);
    const customWords = useSelector((state) => state.game.customWords);

    // State
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [joinCode, setJoinCode] = useState(null);
    const [customWordError, setCustomWordError] = useState(null);

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

    // Functions
    useEffect(() => {
        joinGame(gameId, playerName);
        gamePassword;
        setJoinCode('gameId=' + gameId + ',gamePassword=' + gamePassword);
    }, [gameId, gamePassword]);

    const addCustomWordHandler = (evt) => {
        const enteredString = evt.target.value;
        console.log('custom word: ', enteredString);
        const exists = customWords.indexOf(enteredString);

        if (enteredString.length > 1 && enteredString.length < 41 && customWords.length < 25 && exists === -1) {
            addCustomWord(enteredString);
            document.querySelector('#text-input').value = '';
        } else {
            const errors = [];
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
    };

    // Render
    return (
        <GameCmpnt
            joinCode={joinCode}
            wordsArr={wordsArr}
            score={score}
            teamTurn={turn}
            setTeam={selectTeam}
            randomiseTeams={randomiseTeams}
            setRole={selectRole}
            newGame={newGame}
            endTurnReq={endTurn}
            team={playerTeam}
            role={playerRole}
            blueTeam={blueTeam}
            redTeam={redTeam}
            unassigned={unassigned}
            selectWordBundle={selectWordBundle}
            wordBundles={wordBundles}
            wordBundle={wordBundle}
            customWords={customWords}
            addCustomWordHandler={addCustomWordHandler}
            removeCustomWord={removeCustomWord}
            useCustomWords={useCustomWords}
            customWordError={customWordError}
            guess={guess}
        />
    );
};

Game.propTypes = {
    socketRef: PropTypes.object,
};

Game.defaultProps = {};

export default Game;
