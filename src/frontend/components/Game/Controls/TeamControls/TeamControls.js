import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

// Imports
import Chevron from '../../../UI/Indicators/Chevron/Chevron';
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
    const tabHandler = (evt) => {
        const clickedTab = evt.target.parentElement;
        const isCollapsed = clickedTab.getAttribute('data-collapsed') === 'false';

        isCollapsed === true ? collapseTab(clickedTab) : expandTab(clickedTab);
    };

    const collapseTab = (elem) => {
        const content = elem.childNodes[1];
        content.style.height = 0 + 'px';

        elem.setAttribute('data-collapsed', 'true');
    };

    const expandTab = (elem) => {
        const content = elem.childNodes[1];
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';

        elem.setAttribute('data-collapsed', 'false');
    };

    return (
        <div id='player-teams' className='game__controls__tab'>
            <div className='game__controls__tab__title' onClick={(evt) => tabHandler(evt)}>
                <h3>Teams</h3>
                <Chevron />
            </div>
            <div className='game__controls__tab__content-container'>
                <div className='game__controls__tab__content'>
                    <Button
                        title={'Randomize'}
                        opClasses={'game__controls__tab__content__randomize'}
                        function={() => props.randomiseTeams()}
                    />
                    <div className='game__controls__tab__content__red-team'>
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
                    <div className='game__controls__tab__content__blue-team'>
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
                    <div className='game__controls__tab__content__teamless'>
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
