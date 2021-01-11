import React from 'react';

import HomeCmpnt from '../../components/Menus/Home/Home';

const Home = () => {
    const homeButtons = [
        { title: 'Create Game', route: '/creategame' },
        { title: 'Join Game', route: '/joingame' },
    ];

    return <HomeCmpnt buttons={homeButtons} />;
};

export default Home;
