import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

// Imports
import Button from '../../../UI/Buttons/Button/Button';

/**
 * Component containing the role controls.
 * @function RoleControls
 * @param {object}  props - React props.
 * @prop {string}   props.clientRole - The clients role.
 * @prop {string}   props.clientTeam - The clients team.
 * @prop {function} props.selectRole - Function that emits a socket event to assign the client the selected role.
 * @returns {JSX}
 */
const RoleControls = (props) => {
    return (
        <div className='game__controls__roles'>
            <h3>Roles</h3>
            <div className='game__controls__roles__options'>
                <Button
                    title={'Insider'}
                    opClasses={
                        'btn__insider' +
                        (props.clientTeam === 'blue' ? ' btn__blue' : '') +
                        (props.clientTeam === 'red' ? ' btn__red' : '') +
                        (props.clientRole === 'insider' ? ' active' : '')
                    }
                    opElem={<i className='far fa-comment-dots'></i>}
                    function={() => props.selectRole('insider', props.clientRole)}
                />
                <Button
                    title={'Agent'}
                    opClasses={
                        'btn__agent' +
                        (props.clientTeam === 'blue' ? ' btn__blue' : '') +
                        (props.clientTeam === 'red' ? ' btn__red' : '') +
                        (props.clientRole === 'agent' ? ' active' : '')
                    }
                    opElem={<i className='fas fa-search'></i>}
                    function={() => props.selectRole('agent', props.clientRole)}
                />
            </div>
        </div>
    );
};

RoleControls.propTypes = {
    clientRole: PropTypes.string,
    clientTeam: PropTypes.string,
    selectRole: PropTypes.func,
};

RoleControls.defaultProps = {};

export default React.memo(RoleControls);
