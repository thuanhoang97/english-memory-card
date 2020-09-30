import React from 'react';
import CardContainer from './cards/CardContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <CardContainer
        words={[
          'girl',
          'car',
          'truck',
          'sky',
          'chicken',
          'dragon',
          'baby',
          'men',
        ]}
      />
    </div>
  );
};

export default App;
