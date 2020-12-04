import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../UI/Title/Title';
import Button from '../../UI/Buttons/Button/Button';

import './JoinGame.scss';

const JoinGame = (props) => {
    return (
        <section className='join-game'>
            <Title title='Deduction' />

            <div className='join-game__content'>
                <h3>Enter Join Link:</h3>
                <input onInput={(evt) => props.enterLink(evt)} />
            </div>

            <Button title={'Join!'} function={props.submitHandler} />
        </section>
    );
};

JoinGame.propTypes = {
    enterLink: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    submitErrMsg: PropTypes.object,
};

JoinGame.defaultProps = {
    enterLink: () => {
        console.log('[ENTER LINK] enterLink err');
    },
    submitHandler: () => {
        console.log('[JOIN BTN] submitHandler err');
    },
};

export default JoinGame;
