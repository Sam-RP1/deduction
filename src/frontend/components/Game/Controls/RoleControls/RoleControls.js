import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Styles
import '../Controls.scss';

// Imports
import Chevron from '../../../UI/Indicators/Chevron/Chevron';
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
    const [timeOpened, setTimeOpened] = useState(0);
    const changeToAuto = useRef();

    const tabHandler = (evt) => {
        const clickedTab = evt.target.parentElement;
        const isCollapsed = clickedTab.getAttribute('data-collapsed') === 'false';

        isCollapsed === true ? collapseTab(clickedTab) : expandTab(clickedTab);
    };

    const collapseTab = (elem) => {
        const content = elem.childNodes[1];
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';
        if (Date.now() - 310 < timeOpened) {
            clearTimeout(changeToAuto.current);
        }

        content.style.height = 10 + 'px';

        elem.setAttribute('data-collapsed', 'true');
    };

    const expandTab = (elem) => {
        const content = elem.childNodes[1];
        const contentHeight = content.scrollHeight;
        content.style.height = contentHeight + 'px';

        setTimeOpened(Date.now());
        elem.setAttribute('data-collapsed', 'false');

        // eslint-disable-next-line
        changeToAuto.current = setTimeout(() => {
            content.style.height = 'auto';
            console.log('CHANGED TO AUTO');
        }, 310);
    };

    return (
        <div id='player-roles' className='game__controls__tab'>
            <div className='game__controls__tab__title' onClick={(evt) => tabHandler(evt)}>
                <h3>Roles</h3>
                <Chevron />
            </div>
            <div className='game__controls__tab__content-container'>
                <div className='game__controls__tab__content'>
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
