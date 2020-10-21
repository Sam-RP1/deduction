import React from 'react';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';
import NavButton from '../UI/Buttons/NavButton/NavButton';

import '../../styles/root.scss';
import './SetupMenu.scss';

const SetupMenu = () => {
  const wordGroups = [
    { id: "eng-standard", title: "english" },
    { id: "tbd", title: "tbd" }
  ];

  return (
    <section className="setup-menu">
    <h1 className="setup-menu__title">Deduction</h1>

    <div className="setup-menu__option setup-menu__option__toggle">
    <div className="setup-menu__option__toggle__row">
    <h3>Turn Timer:</h3>
    <ToggleSwitch function={() => console.log("[TURN TIMER] placeholder function")} />
    </div>
    <p>If enabled teams have one minute to complete their turn.</p>
    </div>

    <div className="setup-menu__option setup-menu__option__toggle">
    <div className="setup-menu__option__toggle__row">
    <h3>Quick Game:</h3>
    <ToggleSwitch function={() => console.log("[TURN TIMER] placeholder function")} />
    </div>
    <p>If enabled games will last upto six minutes before ending & teams have 30 seconds to complete each turn.</p>
    </div>

    <div className="setup-menu__option setup-menu__option__word-select">
    <h3>Select a Word Group...</h3>
    <div className="setup-menu__option__word-select__container">
    {wordGroups.map(item => {
      return (
        <div key={item.id} role="checkbox" className="setup-menu__option__word-select__word-brick">
        <p>{item.title}</p>
        </div>
      )
    })}
    </div>
    </div>

    <div className="setup-menu__option setup-menu__option__word-entry">
    <h3>OR</h3>
    <h3>Enter Custom Words...</h3>
    <p>Enter 25 words with a &apos;,&apos; (comma) seperating each word.</p>
    <textarea/>
    </div>

    <NavButton title={"Go!"} route={"/game"} />

    </section>
  )
}

export default SetupMenu;
