import React, { useState, useMemo } from 'react';
import './cards.scss';
import Card, { CardType, CardData, CardState } from './Card';

interface CardContainerProps {
  words: string[];
}

const CardContainer: React.FC<CardContainerProps> = ({ words }) => {
  const [curCardIdx, setCurCardIdx] = useState<number>(-1);
  const [cardsState, setCardsState] = useState(
    Array(words.length * 2).fill(CardState.CLOSED)
  );

  const cardsData = useMemo(() => genCardsData(words), [words]);

  const handleClickCard = (index: number, data: CardData): void => {
    if (cardsState[index] === CardState.CLOSED) {
      setCardState(index, CardState.OPENED);

      if (curCardIdx === -1) {
        setCurCardIdx(index);
      } else {
        let newState: CardState = isSameCard(curCardIdx, index)
        ? CardState.HIDE
        : CardState.CLOSED;

        setTimeout(() => {
          setCardState(curCardIdx, newState);
          setCardState(index, newState);
        }, 600);

        setCurCardIdx(-1);
      }
    }
  };

  const isSameCard = (i1: number, i2: number): boolean =>
    cardsData[i1].key === cardsData[i2].key;

  const setCardState = (index: number, newState: CardState): void => {
    setCardsState((cardsState) =>
      cardsState.map((state, idx) => (idx === index ? newState : state))
    );
  };

  const getCards = (): React.ReactNode[][] => {
    const row = 4;
    const col = 4;
    const cards: React.ReactNode[][] = [];
    for (let i = 0; i < row; i++) {
      cards[i] = [];
      for (let j = 0; j < col; j++) {
        const index: number = i * row + j;
        cards[i].push(
          <Card
            key={index}
            data={cardsData[index]}
            state={cardsState[index]}
            onClickCard={() => handleClickCard(index, cardsData[index])}
          />
        );
      }
    }
    return cards;
  };

  return (
    <div className="card-container">
      {getCards().map((cardsInRow, rowIdx) => (
        <div className="row" key={rowIdx}>
          {cardsInRow}
        </div>
      ))}
    </div>
  );
};

const getImageURL = (keyword: string): string => {
  return `https://source.unsplash.com/150x150/?${keyword}`;
};

const genCardsData = (words: string[]): CardData[] => {
  let data: CardData[] = [];
  words.forEach((word: string) => {
    data.push({ type: CardType.WORD, content: word, key: word });
    data.push({
      type: CardType.IMAGE,
      content: getImageURL(word),
      key: word,
    });
  });
  return data;
};

export default CardContainer;
