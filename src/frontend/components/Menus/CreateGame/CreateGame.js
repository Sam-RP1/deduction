import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './CreateGame.scss';

// Presentational Component
const CreateGame = (props) => {
    return (
        <section className='create-game'>
            <Title />

            <div className='create-game__content'>
                <h3>Create a new game:</h3>
                <label htmlFor='lobby-name'>Lobby Name:</label>
                <input name='lobby-name' autoComplete='off' />
                <label htmlFor='lobby-password'>Lobby Password:</label>
                <input name='lobby-password' type='password' autoComplete='off' />
                <label htmlFor='player-name'>Player Name:</label>
                <input name='player-name' autoComplete='off' />
            </div>

            <Button title={'Go!'} function={props.submitHandler} />
        </section>
    );
};

CreateGame.propTypes = {
    // Turn Timer
    turnTimer: PropTypes.bool.isRequired,
    toggleTurnTimer: PropTypes.func.isRequired,
    // Quick Game
    quickGame: PropTypes.bool.isRequired,
    toggleQuickGame: PropTypes.func.isRequired,
    // Word Group
    selectedWordGroup: PropTypes.string.isRequired,
    wordGroups: PropTypes.array.isRequired,
    wordGroupHandler: PropTypes.func.isRequired,
    // Custom Words
    customWords: PropTypes.array.isRequired,
    addCustomWordHandler: PropTypes.func.isRequired,
    deleteCustomWord: PropTypes.func.isRequired,
    // Submit
    submitHandler: PropTypes.func.isRequired,
    // Errors
    customWordsErrMsg: PropTypes.object,
    submitErrMsg: PropTypes.object,
};

CreateGame.defaultProps = {
    // Turn Timer
    turnTimer: false,
    toggleTurnTimer: () => {
        console.log('[TURN TIMER] toggleTurnTimer err');
    },
    // Quick Game
    quickGame: false,
    toggleQuickGame: () => {
        console.log('[QUICK GAME] toggleQuickGame err');
    },
    // Word Groups
    wordGroups: [{ id: 'err', title: 'ERROR :(' }],
    wordGroupHandler: () => {
        console.log('[WORD GROUP] wordGroupHandler err');
    },
    // Custom Words
    customWords: ['err'],
    addCustomWordHandler: () => {
        console.log('[CUSTOM WORDS] addCustomWordHandler err');
    },
    deleteCustomWord: () => {
        console.log('[CUSTOM WORDS] deleteCustomWord err');
    },
    // Submit
    submitHandler: () => {
        console.log('[SUBMIT BTN] submitHandler err');
    },
};

export default CreateGame;
