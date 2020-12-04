import React from 'react';

import HomeCmpnt from '../../components/Menus/Home/Home';

const Home = () => {
    const homeButtons = [
        { title: 'Create Game', route: '/creategame', function: () => console.log('[HOME BTN] create game') },
        { title: 'Join Game', route: '/joingame', function: () => console.log('[HOME BTN] join game') },
        { title: 'Rules', route: '/rules', function: () => console.log('[HOME BTN] rules') },
    ];

    return <HomeCmpnt buttons={homeButtons} />;
};

export default Home;
