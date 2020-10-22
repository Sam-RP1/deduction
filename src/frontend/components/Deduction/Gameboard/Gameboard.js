import React from 'react';

import './Gameboard.scss';

const Gameboard = () => {
  const wordBlocks = [
    "word", "word2", "word3", "word4", "word5",
    "word", "word2", "word3", "word4", "word5",
    "word", "word2", "word3", "word4", "word5",
    "word", "word2", "word3", "word4", "word5",
    "word", "word2", "word3", "word4", "word5",
  ] // eslint-disable-line
  return (
    <section className="gameboard">
    {wordBlocks.map((block, i) => {
      return (
        <div key={i} className={"gameboard__word-block gameboard__word-block" + "__large"}>
        <p>{block}</p>
        </div>
      )
    })}
    </section>
  )
}

export default Gameboard;
