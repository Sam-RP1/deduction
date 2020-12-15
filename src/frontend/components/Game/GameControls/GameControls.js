import React from 'react';
import PropTypes from 'prop-types';

// Imports
import Button from '../../UI/Buttons/Button/Button';

// Styles
import './GameControls.scss';

// Presentational Component
const GameControls = (props) => {
    const copyJoinCode = () => {
        console.log('[COPY LINK]');
        let aux = document.createElement('input');
        aux.style.position = 'absolute';
        aux.style.left = '-100px';
        aux.style.top = '0px';
        aux.style.display = 'block';
        aux.style.width = '1px';
        aux.style.height = '1px';
        aux.setAttribute('value', props.gameId);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
    };
    // use redux state to style buttons for active or not
    return (
        <section className='game-controls'>
            <div className='game-controls__btns-container'>
                <h3>Turn Timer:</h3>
                <p className='timer-txt'>00:00</p>
                <Button title={'End Turn'} function={() => props.endTurnReq()} />
            </div>

            <div className='game-controls__btns-container'>
                <Button title={'New Game'} function={() => props.newGameReq()} />
                <Button title={'Copy Join Code!'} function={() => copyJoinCode()} />
            </div>

            <div className='game-controls__btns-container'>
                <h3>Choose a Team:</h3>
                <Button
                    title={'Red'}
                    opClasses={'btn__red' + (props.team === 'red' ? ' active' : '')}
                    function={() => props.setTeam('red')}
                />
                <Button
                    title={'Blue'}
                    opClasses={'btn__blue' + (props.team === 'blue' ? ' active' : '')}
                    function={() => props.setTeam('blue')}
                />
            </div>

            <div className='game-controls__btns-container'>
                <h3>Play as:</h3>
                <Button
                    title={'Insider'}
                    opClasses={props.role === 'insider' ? 'active' : ''}
                    function={() => props.setRole('insider')}
                />
                <Button
                    title={'Agent'}
                    opClasses={props.role === 'agent' ? 'active' : ''}
                    function={() => props.setRole('agent')}
                />
            </div>
        </section>
    );
};

GameControls.propTypes = {
    gameId: PropTypes.string.isRequired,
    newGameReq: PropTypes.func.isRequired,
    setTeam: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired,
    endTurnReq: PropTypes.func.isRequired,
    team: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

GameControls.defaultProps = {
    gameId: 'ERR',
    newGameReq: () => {
        console.log('[NEW GAME REQ] error requesting new game');
    },
    setTeam: () => {
        console.log('[SET TEAM BTN] error setting team');
    },
    setRole: () => {
        console.log('[SET ROLE BTN] error setting role');
    },
    endTurnReq: () => {
        console.log('[END TURN REQ] error requesting to end turn');
    },
    team: 'undefined',
    role: 'undefined',
};

export default GameControls;
