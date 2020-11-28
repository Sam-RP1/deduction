import React from 'react';

import PresMainMenu from '../../components/Menus/MainMenu/MainMenu';

const MainMenu = () => {
    const menuButtons = [
        { title: 'Create Game', route: '/creategame', function: () => console.log('[MAIN MENU BTN] create game') },
        { title: 'Join Game', route: '/joingame', function: () => console.log('[MAIN MENU BTN] join game') },
        { title: 'Rules', route: '/rules', function: () => console.log('[MAIN MENU BTN] rules') },
    ];

    return <PresMainMenu buttons={menuButtons} />;
};

export default MainMenu;
