import React from 'react';
import PropTypes from 'prop-types';

// Imports
// import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator'
import Gameboard from './Gameboard/Gameboard';
import GameControls from './GameControls/GameControls';

// Styles
import '../../styles/root.scss';
import './Game.scss';

// Presentational Component
const Game = (props) => {
    return (
        <section className='game'>
            <div className='game__board'>
                <div className='game__board-container'>
                    <div className='game__board-container__information'>
                        <p>
                            <span className='red-txt'>{props.score.red}</span> -{' '}
                            <span className='blue-txt'>{props.score.blue}</span>
                        </p>
                        <p>
                            <span className={props.teamTurn === 'blue' ? 'blue-txt' : 'red-txt'}>Turn</span>
                        </p>
                    </div>
                    <Gameboard wordsArr={props.wordsArr} team={props.team} role={props.role} guess={props.guess} />
                </div>
                <GameControls
                    joinCode={props.joinCode}
                    newGame={props.newGame}
                    setTeam={props.setTeam}
                    randomiseTeams={props.randomiseTeams}
                    setRole={props.setRole}
                    endTurnReq={props.endTurnReq}
                    team={props.team}
                    role={props.role}
                    teamTurn={props.teamTurn}
                    blueTeam={props.blueTeam}
                    redTeam={props.redTeam}
                    unassigned={props.unassigned}
                    selectWordBundle={props.selectWordBundle}
                    wordBundles={props.wordBundles}
                    wordBundle={props.wordBundle}
                    customWords={props.customWords}
                    addCustomWordHandler={props.addCustomWordHandler}
                    removeCustomWord={props.removeCustomWord}
                    useCustomWords={props.useCustomWords}
                    customWordError={props.customWordError}
                />
            </div>
        </section>
    );
};

Game.propTypes = {
    joinCode: PropTypes.string,
    wordsArr: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
    teamTurn: PropTypes.string,
    newGame: PropTypes.func,
    setTeam: PropTypes.func,
    randomiseTeams: PropTypes.func,
    setRole: PropTypes.func,
    endTurnReq: PropTypes.func,
    team: PropTypes.string,
    role: PropTypes.string,
    guess: PropTypes.func,
    blueTeam: PropTypes.array,
    redTeam: PropTypes.array,
    unassigned: PropTypes.array,
    selectWordBundle: PropTypes.func,
    wordBundles: PropTypes.array,
    wordBundle: PropTypes.string,
    customWords: PropTypes.array,
    addCustomWordHandler: PropTypes.func,
    removeCustomWord: PropTypes.func,
    useCustomWords: PropTypes.func,
    customWordError: PropTypes.string,
};

Game.defaultProps = {
    wordsArr: [{ denomination: 'blank', word: 'ERROR' }],
    score: {
        blue: 'ERR',
        red: 'ERR',
    },
};

export default Game;
