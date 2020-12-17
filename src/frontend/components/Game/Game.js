import React from 'react';
import PropTypes from 'prop-types';

// Imports
import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator';
import Gameboard from './Gameboard/Gameboard';
import GameControls from './GameControls/GameControls';

// Styles
import '../../styles/root.scss';
import './Game.scss';

// Presentational Component
const Game = (props) => {
    return (
        <section className='game'>
            {!props.isLoaded && <LoadingIndicator />}
            {props.isLoaded && (
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
                        gameId={props.gameId}
                        newGameReq={props.newGameReq}
                        setTeam={props.setTeam}
                        setRole={props.setRole}
                        endTurnReq={props.endTurnReq}
                        team={props.team}
                        role={props.role}
                    />
                </div>
            )}
        </section>
    );
};

Game.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    gameId: PropTypes.string.isRequired,
    wordsArr: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
    teamTurn: PropTypes.string.isRequired,
    newGameReq: PropTypes.func,
    setTeam: PropTypes.func,
    setRole: PropTypes.func,
    endTurnReq: PropTypes.func,
    team: PropTypes.string,
    role: PropTypes.string,
    guess: PropTypes.func,
};

Game.defaultProps = {
    isLoaded: false,
    gameId: 'ERR',
    wordsArr: [{ denomination: 'blank', word: 'ERROR' }],
    score: {
        blue: 'ERR',
        red: 'ERR',
    },
    teamTurn: 'ERR',
};

export default Game;
