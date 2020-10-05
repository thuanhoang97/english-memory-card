import React from 'react';
import Card from './Card';
import { CardData } from './card.helper';

type Props = {
  cardsData: CardData[];
  row: number;
  col: number;
  onClickCard: (target: HTMLElement) => void;
};

const CardList: React.FC<Props> = ({ cardsData, row, col, onClickCard }) => {
  const getCards = (): React.ReactNode[][] => {
    const cards: React.ReactNode[][] = [];
    for (let i = 0; i < row; i++) {
      cards[i] = [];
      for (let j = 0; j < col; j++) {
        const index: number = i * row + j;
        cards[i].push(
          <Card
            index={index}
            key={index}
            data={cardsData[index]}
            onClickCard={onClickCard}
          />
        );
      }
    }
    return cards;
  };

  return (
    <div className="cards">
      {getCards().map((cardsInRow, rowIdx) => (
        <div className="row" key={rowIdx}>
          {cardsInRow}
        </div>
      ))}
    </div>
  );
};

export default CardList;
