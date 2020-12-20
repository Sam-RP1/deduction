import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './CreateGame.scss';

// Presentational Component
const CreateGame = (props) => {
    console.log('[CREATE GAME PRES COMPONENT RENDER]');
    console.log(props.gameNameError);
    return (
        <section className='create-game'>
            <Title />

            <div className='create-game__content'>
                <h3>Create a new game:</h3>
                <label htmlFor='game-name'>Game Name:</label>
                <input ref={props.gameNameRef} name='game-name' type='text' autoComplete='off' maxLength={12} />
                {props.gameNameError}
                <label htmlFor='game-password'>Game Password:</label>
                <input
                    ref={props.gamePasswordRef}
                    name='game-password'
                    type='password'
                    autoComplete='off'
                    maxLength={12}
                />
                {props.gamePasswordError}
                <label htmlFor='player-name'>Player Name:</label>
                <input ref={props.playerNameRef} name='player-name' type='text' autoComplete='off' maxLength={12} />
                {props.playerNameError}
            </div>

            <Button title={'Go!'} function={props.submitHandler} />
        </section>
    );
};

CreateGame.propTypes = {
    gameNameRef: PropTypes.object,
    gamePasswordRef: PropTypes.object,
    playerNameRef: PropTypes.object,
    gameNameError: PropTypes.element,
    gamePasswordError: PropTypes.element,
    playerNameError: PropTypes.element,
    closeError: PropTypes.func,
    submitHandler: PropTypes.func.isRequired,
};

CreateGame.defaultProps = {
    submitHandler: () => {
        console.log('[SUBMIT BTN] submitHandler err');
    },
};

export default CreateGame;
