import React, { useState, useEffect } from 'react';
import './cards.scss';
import CardBoard from './CardBoard';
import Loading from './Loading';
import { genCardsData, CardType, CardData } from './card.helper';

type CardContainerProps = {
  words: string[];
};

const CardContainer: React.FC<CardContainerProps> = ({ words }) => {
  const [started, setStarted] = useState<boolean>(false);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [numImagesLoaded, setNumImagesLoaded] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (numImagesLoaded === words.length) {
      setTimeout(() => setLoading(false), 500);
    }
  }, [numImagesLoaded, words]);

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStarted(true);
    setLoading(true);
    loadData();
  };

  const loadData = () => setCardsData(genCardsData(words));

  const handleImageLoaded = () => setNumImagesLoaded((num) => num + 1);

  const getImagesURL = () =>
    cardsData.filter((d) => d.type === CardType.IMAGE).map((d) => d.content);

  const loadingPercent = Math.floor((numImagesLoaded / words.length) * 100);

  if (loading) {
    return (
      <>
        <Loading percent={loadingPercent} />
        <div className="fake-images">
          {getImagesURL().map((url, idx) => (
            <img
              key={idx}
              src={url}
              onLoad={handleImageLoaded}
              alt=""
              style={{ display: 'none' }}
            />
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="card-container">
      {started ? (
        <CardBoard cardsData={cardsData} onPlayAgain={loadData} />
      ) : (
        <button className="btn" onClick={handleStartGame}>
          Start
        </button>
      )}
    </div>
  );
};

export default CardContainer;
