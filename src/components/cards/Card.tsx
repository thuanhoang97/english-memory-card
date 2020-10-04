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
  onClickCard: (target: Element) => void;
}

const Card: React.VFC<CardProps> = ({ data, onClickCard }) => {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const target = e.currentTarget;
    target.setAttribute('key', data.key);
    onClickCard(target);
  };

  return (
    <div className={`card `} onClick={handleClick}>
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

export default Card;
