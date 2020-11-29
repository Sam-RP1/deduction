import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import ToggleSwitch from '../../UI/ToggleSwitch/ToggleSwitch';
import NavButton from '../../UI/Buttons/NavButton/NavButton';

// Styles
import './SetupMenu.scss';

// Presentational Component
const SetupMenu = (props) => {
    return (
        <section className='setup-menu'>
            <Title title='Deduction' />

            <div className='setup-menu__option'>
                <div className='setup-menu__option__row'>
                    <h3>Turn Timer:</h3>
                    <ToggleSwitch function={props.toggleTurnTimer} />
                </div>
                <p>If enabled teams have one minute to complete their turn.</p>
            </div>

            <div className='setup-menu__option'>
                <div className='setup-menu__option__row'>
                    <h3>Quick Game:</h3>
                    <ToggleSwitch function={props.toggleQuickGame} />
                </div>
                <p>
                    If enabled games will last upto six minutes before ending & teams have 30 seconds to complete each
                    turn.
                </p>
            </div>

            <div className='setup-menu__option__selection'>
                <h3>Select a Word Group...</h3>
                <div className='setup-menu__option__selection__container'>
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
                                className='setup-menu__option__selection__brick'
                            >
                                <p>{item.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='setup-menu__option__text-input'>
                <h3>OR</h3>
                <h3>Enter Custom Words...</h3>
                <p>Enter 25 words with a , (comma) seperating each word.</p>
                <textarea onChange={props.customWordsHandler} />
            </div>

            <NavButton title={'Go!'} route={'/game'} />
        </section>
    );
};

SetupMenu.propTypes = {
    toggleTurnTimer: PropTypes.func.isRequired,
    toggleQuickGame: PropTypes.func.isRequired,
    wordGroups: PropTypes.array.isRequired,
    wordGroupHandler: PropTypes.func.isRequired,
    customWordsHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
};

SetupMenu.defaultProps = {
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
    customWordsHandler: () => {
        console.log('[CUSTOM WORDS] customWordsHandler err');
    },
    submitHandler: () => {
        console.log('[SUBMIT BTN] submitHandler err');
    },
};

export default SetupMenu;
