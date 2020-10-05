import React, { useState, useEffect } from 'react';
import './cards.scss';
import CardList from './CardList';
import { actionByState, isSameCard, CardData } from './card.helper';

type Props = {
  cardsData: CardData[];
  onPlayAgain: () => void;
};

const CardBoard: React.FC<Props> = ({ cardsData, onPlayAgain }) => {
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [numMove, setNumMove] = useState<number>(0);
  const [openCardsEl, setOpenCardsEl] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (score === cardsData.length / 2) {
      setTimeout(() => setGameFinished(true), 1500);
    }
  }, [score, cardsData]);

  useEffect(() => {
    if (openCardsEl.length < 2) return;

    setOpenCardsEl(openCardsEl.slice(2));
    const checkingCardsEl = openCardsEl.slice(0, 2);
    if (isSameCard(checkingCardsEl[0], checkingCardsEl[1])) {
      actionByState(checkingCardsEl, 'right', 400);
      setScore((score) => score + 1);
    } else {
      actionByState(checkingCardsEl, 'wrong', 600);
    }

    setNumMove((num) => num + 1);
  }, [openCardsEl]);

  const handleClickCard = (cardEl: HTMLElement) => {
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
        <CardList
          cardsData={cardsData}
          row={4}
          col={4}
          onClickCard={handleClickCard}
        />
      )}
    </div>
  );
};

export default CardBoard;
