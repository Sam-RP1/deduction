import React, { useState } from "react";

import Footer from './components/Footer/Footer';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    isDarkTheme ? setIsDarkTheme(false) : setIsDarkTheme(true);
    console.log("[THEME] toggled")
  }

  return (
    <div className={"theme " + (isDarkTheme ? "theme--dark" : "theme--default")}>
    <section className="test"></section>
    <Footer themeToggle={() => toggleTheme()} />
    </div>
  );
}

export default App;
