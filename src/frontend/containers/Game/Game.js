import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Presentational Components
import GameCmpnt from '../../components/Game/Game';

// Other
import useGame from '../../hooks/useGame';

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
    // const guessesBlue = useSelector((state) => state.game.guessesBlue);
    // const guessesRed = useSelector((state) => state.game.guessesRed);

    // State
    // const [customWordsErrMsg, setCustomWordsErrMsg] = useState(null);
    const [joinCode, setJoinCode] = useState(null);

    // Vars
    const { joinGame, newGame, selectTeam, randomiseTeams, selectRole, selectWordBundle, endTurn } = useGame(
        props.socketRef,
        gameId
    );

    // Functions
    useEffect(() => {
        joinGame(gameId, playerName);
        gamePassword;
        setJoinCode('gameId=' + gameId + ',gamePassword=' + gamePassword);
    }, [gameId, gamePassword]);

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
        />
    );
};

Game.propTypes = {
    socketRef: PropTypes.object,
};

Game.defaultProps = {};

export default Game;
