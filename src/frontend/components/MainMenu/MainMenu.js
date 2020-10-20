import React, { useEffect } from 'react';
import Typed from 'typed.js';

import NavButton from '../UI/Buttons/NavButton/NavButton';

import '../../styles/root.scss';
import './MainMenu.scss';

const MainMenu = () => {
  const menuButtons = [
    { title: "Start Game", route: "/startgame", function: () => console.log("TEMP BTN FUNC") },
    { title: "Join Game", route: "/joingame", function: () => console.log("TEMP BTN FUNC") },
    { title: "Rules", route: "/rules", function: () => console.log("TEMP BTN FUNC") }
  ]

  useEffect(() => {
    const typedOptions = {
      strings: ["Deduction"],
      startDelay: 300,
      typeSpeed: 90,
      showCursor: false
    };

    const elem = document.getElementsByClassName("main-menu__title")[0];

    const typed = new Typed(elem, typedOptions); // eslint-disable-line
  }, [])

  return (
    <section className="main-menu">
    <h1 className="main-menu__title"></h1>
    <div className="main-menu__nav-btns-container">
    {menuButtons.map((item) => {
      return (
        <NavButton key={item.route} title={item.title} route={item.route} function={item.function} />
      )
    })}
    </div>
    </section>
  )
}

export default MainMenu;
