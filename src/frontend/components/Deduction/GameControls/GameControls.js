import React from 'react';

import Button from '../../UI/Buttons/Button/Button';

import './GameControls.scss';

const GameControls = () => {
  const copyText = () => {
    console.log("[COPY LINK]")
    let aux = document.createElement("input");
    aux.style.display = "none";
    aux.setAttribute("value", "Test Link");
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  return (
    <section className="game-controls">

    <div className="game-controls__btns-container">
    <h3>Turn Timer:</h3>
    <p className="timer-txt">00:00</p>
    <Button title={"End Turn"} />
    </div>

    <div className="game-controls__btns-container">
    <Button title={"New Game"} />
    <Button title={"Copy Join Link!"} function={() => copyText()} />
    </div>

    <div className="game-controls__btns-container">
    <h3>Choose a Team:</h3>
    <Button title={"Red"} opClasses={"btn__red"} />
    <Button title={"Blue"} opClasses={"btn__blue"} />
    </div>

    <div className="game-controls__btns-container">
    <h3>Play as:</h3>
    <Button title={"Insider"} />
    <Button title={"Agent"} />
    </div>

    </section>
  )
}

export default GameControls;
