import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

// Imports
import Button from '../../../UI/Buttons/Button/Button';

/**
 * Component containing the team controls.
 * @function TeamControls
 * @param {object}  props - React props.
 * @prop {array}    props.blueTeam - The clients on the blue team.
 * @prop {string}   props.clientTeam - String containing the clients team.
 * @prop {func}     props.randomiseTeams - Function that emits a socket event to randomise the teams.
 * @prop {array}    props.redTeam - The clients on the red team.
 * @prop {function} props.selectTeam - Function that emits a socket event to put the client on the selected team.
 * @prop {array}    props.unassigned - The clients that are not on a team.
 * @returns {JSX}
 */
const TeamControls = (props) => {
    return (
        <div className='game__controls__teams'>
            <h3>Teams</h3>
            <div className='game__controls__teams__options'>
                <Button
                    title={'Randomize'}
                    opClasses={'game__controls__teams__options__randomize'}
                    function={() => props.randomiseTeams()}
                />
                <div className='game__controls__teams__options__red-team'>
                    <Button
                        title={'Red'}
                        opClasses={'btn__red' + (props.clientTeam === 'red' ? ' active' : '')}
                        function={() => props.selectTeam('red', props.clientTeam)}
                    />
                    {props.redTeam.map((player, i) => {
                        return (
                            <p key={i}>
                                {player.playerName}{' '}
                                {player.role === 'insider' ? <i className='far fa-comment-dots'></i> : null}
                                {player.role === 'agent' ? <i className='fas fa-search'></i> : null}
                            </p>
                        );
                    })}
                </div>
                <div className='game__controls__teams__options__blue-team'>
                    <Button
                        title={'Blue'}
                        opClasses={'btn__blue' + (props.clientTeam === 'blue' ? ' active' : '')}
                        function={() => props.selectTeam('blue', props.clientTeam)}
                    />
                    {props.blueTeam.map((player, i) => {
                        return (
                            <p key={i}>
                                {player.playerName}{' '}
                                {player.role === 'insider' ? <i className='far fa-comment-dots'></i> : null}
                                {player.role === 'agent' ? <i className='fas fa-search'></i> : null}
                            </p>
                        );
                    })}
                </div>
                <div className='game__controls__teams__options__teamless'>
                    <p>TEAMLESS:</p>
                    {props.unassigned.map((player, i) => {
                        return (
                            <p key={i}>
                                {player.playerName}{' '}
                                {player.role === 'insider' ? <i className='far fa-comment-dots'></i> : null}
                                {player.role === 'agent' ? <i className='fas fa-search'></i> : null},
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

TeamControls.propTypes = {
    blueTeam: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
    clientTeam: PropTypes.string,
    randomiseTeams: PropTypes.func,
    redTeam: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
    selectTeam: PropTypes.func,
    unassigned: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.string,
            playerName: PropTypes.string,
            team: PropTypes.string,
            role: PropTypes.string,
        })
    ),
};

TeamControls.defaultProps = {};

export default React.memo(TeamControls);
