import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './cards.scss';
import CardBoard from './CardBoard';
import ImagesLoading from './ImagesLoading';
import { genCardsData, CardType, CardData } from './card.helper';

type CardContainerProps = {
  words: string[];
};

const CardContainer: React.FC<CardContainerProps> = ({ words }) => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const imagesURL = useMemo(() => {
    return cardsData
      .filter((d) => d.type === CardType.IMAGE)
      .map((d) => d.content);
  }, [cardsData]);

  const loadData = useCallback(() => setCardsData(genCardsData(words)), [
    words,
  ]);
  const handleFinishedLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    setLoading(true);
    setCardsData(genCardsData(words));
  }, [words]);

  return (
    <div className="card-container">
      {loading ? (
        <ImagesLoading
          imagesURL={imagesURL}
          onFinished={handleFinishedLoading}
        />
      ) : (
        <CardBoard cardsData={cardsData} onPlayAgain={loadData} />
      )}
    </div>
  );
};

export default CardContainer;
