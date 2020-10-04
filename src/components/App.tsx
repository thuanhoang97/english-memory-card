import React, { useState } from 'react';
import CardContainer from './cards/CardContainer';

const App: React.FC = () => {
  const [words, setWords] = useState<string[]>([
    'girl',
    'car',
    // 'truck',
    // 'sky',
    // 'chicken',
    // 'dragon',
    // 'baby',
    // 'men',
  ]);

  return (
    <div className="App">
      <h1 className="title">Memory english cards</h1>
      <CardContainer words={words} />
    </div>
  );
};

export default App;
