import React, { useState, useEffect } from 'react';
import WordContainer, { NUM_WORD_REQUIRE } from './words/WordContainer';
import CardContainer from './cards/CardContainer';

const App: React.FC = () => {
  const initWords = JSON.parse(localStorage.getItem('english_words') || '[]');
  const [words, setWords] = useState<string[]>(initWords);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('english_words', JSON.stringify(words));
  }, [words]);

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStarted(true);
  };

  const canStartGame = words.length === NUM_WORD_REQUIRE;

  return (
    <div className="App">
      <h1 className="title">Memory english cards</h1>
      {started ? (
        <CardContainer words={words} />
      ) : (
        <>
          <WordContainer words={words} setWords={(words) => setWords(words)} />
          <button
            className="btn"
            onClick={handleStartGame}
            disabled={!canStartGame}>
            Start
          </button>
        </>
      )}
    </div>
  );
};

export default App;
