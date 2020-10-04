import React, { useState, useEffect } from 'react';
import './cards.scss';
import Card from './Card';
import { actionByState, isSameCard, CardData } from './card.helper';

type Props = {
  cardsData: CardData[];
  onPlayAgain: () => void;
};

const CardBoard: React.FC<Props> = ({ cardsData, onPlayAgain }) => {
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [numMove, setNumMove] = useState<number>(0);
  const [openCardsEl, setOpenCardsEl] = useState<Element[]>([]);

  useEffect(() => {
    if (score === cardsData.length / 2) {
      setTimeout(() => setGameFinished(true), 1000);
    }
  }, [score, cardsData]);

  useEffect(() => {
    if (openCardsEl.length < 2) return;

    setOpenCardsEl(openCardsEl.slice(2));
    const checkingCardsEl = openCardsEl.slice(0, 2);
    let checkState: string;
    if (isSameCard(checkingCardsEl[0], checkingCardsEl[1])) {
      checkState = 'right';
      setScore((score) => score + 1);
    } else {
      checkState = 'wrong';
    }

    checkingCardsEl.forEach((cardEl) => {
      cardEl.setAttribute('check', checkState);
      actionByState(cardEl);
    });
    setNumMove((num) => num + 1);
  }, [openCardsEl]);

  const handleClickCard = (cardEl: Element) => {
    if (cardEl.classList.contains('open')) return;
    cardEl.classList.add('open');

    setOpenCardsEl([cardEl, ...openCardsEl]);
  };

  const handlePlayAgain = () => {
    setGameFinished(false);
    setScore(0);
    setNumMove(0);
    onPlayAgain();
  };

  const getCards = (): React.ReactNode[][] => {
    const row = Math.log2(cardsData.length);
    const col = row;
    const cards: React.ReactNode[][] = [];
    for (let i = 0; i < row; i++) {
      cards[i] = [];
      for (let j = 0; j < col; j++) {
        const index: number = i * row + j;
        cards[i].push(
          <Card
            key={index}
            data={cardsData[index]}
            onClickCard={handleClickCard}
          />
        );
      }
    }
    return cards;
  };

  return (
    <div className="card-board">
      <div className="info">
        <p className="info__move">Move: {numMove}</p>
      </div>
      {gameFinished ? (
        <button className="btn" onClick={handlePlayAgain}>
          Play again
        </button>
      ) : (
        <div className="cards">
          {getCards().map((cardsInRow, rowIdx) => (
            <div className="row" key={rowIdx}>
              {cardsInRow}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardBoard;
