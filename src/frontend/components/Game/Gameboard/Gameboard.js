import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gameboard.scss';

// Presentational Component
const Gameboard = (props) => {
    console.log('WORDS FOR BOARD', props.wordsArr);
    return (
        <section className='gameboard'>
            {props.wordsArr.map((block) => {
                return (
                    <div
                        key={block.word}
                        id={block.word}
                        className={
                            'gameboard__word-block gameboard__word-block' +
                            '__large ' +
                            (props.role === 'insider' ? block.denomination : '')
                        }
                        onClick={() => {
                            props.guess(block);
                        }}
                    >
                        <p>{block.word}</p>
                    </div>
                );
            })}
        </section>
    );
};

Gameboard.propTypes = {
    team: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    wordsArr: PropTypes.array.isRequired,
    guess: PropTypes.func.isRequired,
};

Gameboard.defaultProps = {
    team: 'undefined',
    role: 'undefined',
    wordsArr: [{ denomination: 'blank', word: 'ERROR' }],
    guess: () => {
        console.log('[GUESS] error making guess');
    },
};

export default Gameboard;
