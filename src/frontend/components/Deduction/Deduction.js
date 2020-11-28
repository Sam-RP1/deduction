import React from 'react';

import LoadingIndicator from '../UI/LoadingIndicator/LoadingIndicator'; // eslint-disable-line
import Title from '../UI/Title/Title';
import Gameboard from './Gameboard/Gameboard';
import GameControls from './GameControls/GameControls';

import '../../styles/root.scss';
import './Deduction.scss';

const Deduction = () => {
  return (
    <section className="deduction">
    <Title />
    <div className="deduction__gameboard">
    <div className="deduction__gameboard-container">
    <div className="deduction__gameboard-container__information">
    <p>Score: <span className="red-txt">X</span> - <span className="blue-txt">X</span></p>
    <p>Game Time: 6:00</p>
    <p><span className="blue-txt">Blue’s</span> Turn</p>
    </div>
    <Gameboard />
    </div>
    <GameControls />
    </div>
    </section>
  )
}

export default Deduction;
