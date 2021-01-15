import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Loading from '../../UI/Indicators/Loading/Loading.js';
import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './CreateGame.scss';

// Presentational Component
const CreateGame = (props) => {
    return (
        <section className='create-game'>
            <Title />
            {props.isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className='create-game__content'>
                        <h3>Create a new game:</h3>
                        <label htmlFor='game-name'>Game Name:</label>
                        <input ref={props.gameNameRef} name='game-name' type='text' autoComplete='off' maxLength={20} />
                        {props.gameNameError}
                        <label htmlFor='game-password'>Game Password:</label>
                        <input
                            ref={props.gamePasswordRef}
                            name='game-password'
                            type='password'
                            autoComplete='off'
                            maxLength={20}
                        />
                        {props.gamePasswordError}
                        <label htmlFor='player-name'>Player Name:</label>
                        <input
                            ref={props.playerNameRef}
                            name='player-name'
                            type='text'
                            autoComplete='off'
                            maxLength={12}
                        />
                        {props.playerNameError}
                        {props.generalError}
                    </div>

                    <Button title={'Go!'} function={props.submitHandler} />
                </>
            )}
        </section>
    );
};

CreateGame.propTypes = {
    isLoading: PropTypes.bool,
    gameNameRef: PropTypes.object,
    gamePasswordRef: PropTypes.object,
    playerNameRef: PropTypes.object,
    generalError: PropTypes.element,
    gameNameError: PropTypes.element,
    gamePasswordError: PropTypes.element,
    playerNameError: PropTypes.element,
    submitHandler: PropTypes.func,
};

CreateGame.defaultProps = {};

export default CreateGame;
