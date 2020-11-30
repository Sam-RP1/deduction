import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import ToggleSwitch from '../../UI/ToggleSwitch/ToggleSwitch';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './CreateGameMenu.scss';

// Presentational Component
const CreateGameMenu = (props) => {
    return (
        <section className='create-game-menu'>
            <Title title='Deduction' />

            <div className='create-game-menu__option'>
                <div className='create-game-menu__option__row'>
                    <h3>Turn Timer:</h3>
                    <ToggleSwitch function={props.toggleTurnTimer} />
                </div>
                <p>If enabled teams have one minute to complete their turn.</p>
            </div>

            <div className='create-game-menu__option'>
                <div className='create-game-menu__option__row'>
                    <h3>Quick Game:</h3>
                    <ToggleSwitch function={props.toggleQuickGame} />
                </div>
                <p>
                    If enabled games will last upto six minutes before ending & teams have 30 seconds to complete each
                    turn.
                </p>
            </div>

            <div className='create-game-menu__option__selection'>
                <h3>Select a Word Group...</h3>
                <div className='create-game-menu__option__selection__container'>
                    {props.wordGroups.map((item) => {
                        return (
                            <div
                                key={item.id}
                                id={item.id}
                                role='checkbox'
                                aria-checked='false'
                                onClick={() => {
                                    props.wordGroupHandler(item.id);
                                }}
                                className='create-game-menu__option__selection__brick'
                            >
                                <p>{item.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='create-game-menu__option__text-input'>
                <h3>OR</h3>
                <h3>Enter Custom Words...</h3>
                <p>Enter 25 words by typing one word at a time in the box below and then pressing your enter key.</p>
                {props.customWordsErrMsg}
                <input
                    id='text-input'
                    onKeyPress={(evt) => {
                        if (evt.key === 'Enter') {
                            props.addCustomWordHandler(evt);
                        }
                    }}
                    minLength={2}
                    maxLength={30}
                />
                <p>{props.customWords.length} / 25</p>
                <div className='create-game-menu__option__text-input__bricks'>
                    {props.customWords.map((word) => {
                        return (
                            <div
                                key={word}
                                onClick={() => {
                                    props.deleteCustomWordHandler(word);
                                }}
                            >
                                <p>{word}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {props.submitErrMsg}

            <Button title={'Go!'} function={props.submitHandler} />
        </section>
    );
};

CreateGameMenu.propTypes = {
    toggleTurnTimer: PropTypes.func.isRequired,
    toggleQuickGame: PropTypes.func.isRequired,
    wordGroups: PropTypes.array.isRequired,
    wordGroupHandler: PropTypes.func.isRequired,
    customWords: PropTypes.array.isRequired,
    addCustomWordHandler: PropTypes.func.isRequired,
    deleteCustomWordHandler: PropTypes.func.isRequired,
    customWordsErrMsg: PropTypes.object,
    submitHandler: PropTypes.func.isRequired,
    submitErrMsg: PropTypes.object,
};

CreateGameMenu.defaultProps = {
    toggleTurnTimer: () => {
        console.log('[TURN TIMER] toggleTurnTimer err');
    },
    toggleQuickGame: () => {
        console.log('[QUICK GAME] toggleQuickGame err');
    },
    wordGroups: [{ id: 'err', title: 'ERROR :(' }],
    wordGroupHandler: () => {
        console.log('[WORD GROUP] wordGroupHandler err');
    },
    customWords: ['err'],
    addCustomWordHandler: () => {
        console.log('[CUSTOM WORDS] addCustomWordHandler err');
    },
    deleteCustomWordHandler: () => {
        console.log('[CUSTOM WORDS] deleteCustomWordHandler err');
    },
    submitHandler: () => {
        console.log('[SUBMIT BTN] submitHandler err');
    },
};

export default CreateGameMenu;
