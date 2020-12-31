import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Gameboard.scss';

// Presentational Component
const Gameboard = (props) => {
    return (
        <section className='gameboard'>
            {props.wordsArr.length === 25 ? (
                props.wordsArr.map((block) => {
                    return (
                        <div
                            key={block.word}
                            id={block.word}
                            className={
                                'gameboard__word-block ' +
                                (props.role === 'insider' || block.guessData.isGuessed === true
                                    ? block.denomination
                                    : '') +
                                (block.guessData.isGuessed === true ? ' guessed' : '')
                            }
                            onClick={() => {
                                props.guess(block, props.team, props.role);
                            }}
                        >
                            <span>
                                <p>{block.word}</p>
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className='gameboard__placeholder'>
                    <h1>Welcome! Please select a word bundle or enter 25 of your own words.</h1>
                </div>
            )}
        </section>
    );
};

Gameboard.propTypes = {
    team: PropTypes.string,
    role: PropTypes.string,
    wordsArr: PropTypes.array,
    guess: PropTypes.func,
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
