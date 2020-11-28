import React, { useState } from 'react';

import PresSetupMenu from '../../components/Menus/SetupMenu/SetupMenu';

const CreateGameMenu = () => {
    const [selectedWordGroup, setSelectedWordGroup] = useState(null);
    const wordGroups = [
        { id: 'eng-standard', title: 'english' },
        { id: 'tbd', title: 'tbd' },
    ];

    const wordGroupHandler = (id) => {
        if (id !== selectedWordGroup && selectedWordGroup !== null) {
            const prevSelected = document.getElementById(selectedWordGroup);
            const curSelected = document.getElementById(id);
            prevSelected.setAttribute('aria-checked', 'false');
            curSelected.setAttribute('aria-checked', 'true');
            setSelectedWordGroup(id);
        } else if (selectedWordGroup === null) {
            const curSelected = document.getElementById(id);
            curSelected.setAttribute('aria-checked', 'true');
            setSelectedWordGroup(id);
        }
    };

    return <PresSetupMenu wordGroups={wordGroups} wordGroupHandler={wordGroupHandler} />;
};

export default CreateGameMenu;
