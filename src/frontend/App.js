import React, { useState } from "react";

import ContentContainer from './components/UI/ContentContainer/ContentContainer';
import MainMenu from './components/MainMenu/MainMenu'; // eslint-disable-line
import SetupMenu from './components/SetupMenu/SetupMenu'; // eslint-disable-line
import Deduction from './components/Deduction/Deduction'; // eslint-disable-line
import Footer from './components/Footer/Footer';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true);
    console.log("[THEME] toggled")
  }

  return (
    <div className={"theme " + (isDarkTheme ? "theme--dark" : "theme--default")}>
    <div className="base">
    <ContentContainer opClasses={"content-container__center content-container__column"}>
    <Deduction />
    </ContentContainer>
    <Footer themeToggle={() => toggleTheme()} />
    </div>
    </div>
  );
}

export default App;
