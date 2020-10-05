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
  index: number;
  onClickCard: (target: HTMLElement) => void;
}

const Card: React.VFC<CardProps> = ({ index, data, onClickCard }) => {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    const target = e.currentTarget;
    target.setAttribute('key', data.key);
    onClickCard(target as HTMLElement);
  };

  return (
    <div className={`card`} onClick={handleClick} style={{ animationDelay: `${index * 0.05}s`}}>
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
