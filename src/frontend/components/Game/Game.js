import React from 'react';
import PropTypes from 'prop-types';

// Imports
import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator'; // eslint-disable-line
import Title from '../UI/Title/Title';
import Gameboard from './Gameboard/Gameboard';
import GameControls from './GameControls/GameControls';

// Styles
import '../../styles/root.scss';
import './Game.scss';

// Presentational Component
const Game = (props) => {
    return (
        <section className='game'>
            <Title />
            {props.isLoaded && <LoadingIndicator />}
            {!props.isLoaded && (
                <div className='game__board'>
                    <div className='game__board-container'>
                        <div className='game__board-container__information'>
                            <p>
                                Score: <span className='red-txt'>X</span> - <span className='blue-txt'>X</span>
                            </p>
                            <p>Game Time: 6:00</p>
                            <p>
                                <span className='blue-txt'>Blue’s</span> Turn
                            </p>
                        </div>
                        <Gameboard wordsArr={props.wordsArr} />
                    </div>
                    <GameControls />
                </div>
            )}
        </section>
    );
};

Game.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    wordsArr: PropTypes.array.isRequired,
};

Game.defaultProps = {
    isLoaded: false,
    wordsArr: [{ denomination: 'blank', word: 'ERROR' }],
};

export default Game;
