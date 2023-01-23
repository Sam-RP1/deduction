import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import useSocket from './hooks/useSocket';

import Header from './components/Header/Header';
import Container from './components/UI/Container/Container';
import Home from './containers/Home/Home';
import CreateGame from './containers/CreateGame/CreateGame';
import JoinGame from './containers/JoinGame/JoinGame';
import Game from './containers/Game/Game';
import Footer from './components/Footer/Footer';
import Alerts from './components/Alerts/Alerts';

import './styles/root.scss';

const App = () => {
    const { socketRef } = useSocket();

    const themeToggle = () => {
        const themeElem = document.getElementById('theme');
        themeElem.classList.toggle('theme--dark');
        themeElem.classList.toggle('theme--default');
    };

    return (
        <div id='theme' className='theme theme--dark' data-test='component-app'>
            <BrowserRouter>
                <div className='base'>
                    <Route
                        render={({ location }) => {
                            if (location.pathname === '/creategame' || location.pathname === '/joingame') {
                                return <Header btnTitle={'Back'} />;
                            } else if (location.pathname === '/game') {
                                return <Header btnTitle={'Leave'} />;
                            }
                        }}
                    />
                    <Container opClasses={'container--center container--column'}>
                        <Route
                            path='/game'
                            component={() => {
                                if (socketRef.current !== undefined) {
                                    return <Game socketRef={socketRef} />;
                                } else {
                                    return <Redirect to='/' />;
                                }
                            }}
                        />
                        <Route path='/joingame' component={JoinGame} />
                        <Route path='/creategame' component={CreateGame} />
                        <Route path='/' exact component={Home} />
                    </Container>
                    <Footer themeToggle={() => themeToggle()} />
                    <Alerts />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
