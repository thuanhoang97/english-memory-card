import React from 'react';

export enum CardType {
  IMAGE = 'IMAGE',
  WORD = 'WORD',
}

export enum CardState {
  CLOSED,
  OPENED,
  HIDE,
  WRONG,
}

export interface CardData {
  type: CardType;
  content: string;
  key: string;
}

interface CardProps {
  data: CardData;
  state?: CardState;
  onClickCard: () => void;
}

const Card: React.VFC<CardProps> = ({ data, state, onClickCard }) => {

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    // e.currentTarget.classList.add('open');
    onClickCard();
  };

  const getClassNameByState = (): string => {
    switch(state) {
      case CardState.OPENED:
        return 'open';

      case CardState.HIDE:
        return 'hide';

      default: 
        return '';
    }
  };

  return (
    <div className={`card  ${getClassNameByState()}`} onClick={handleClick}>
      <div className="card__side card__side--front">
        {data.type === CardType.WORD ? (
          <p>{data.content}</p>
        ) : (
          <div
            className="image"
            style={{
              backgroundImage: `url(${data.content})`,
            }}
          ></div>
        )}
      </div>
      <div className="card__side card__side--back"></div>
    </div>
  );
};

Card.defaultProps = {
  state: CardState.CLOSED,
};

export default Card;
