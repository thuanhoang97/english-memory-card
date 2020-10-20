export enum CardType {
  IMAGE = 'IMAGE',
  WORD = 'WORD',
}

export type CardData = {
  type: CardType;
  content: string;
  key: string;
};

export const TOP_SCORE_RECORD = 10;

export const getImageURL = (keyword: string): string => {
  return `https://source.unsplash.com/150x150/?${keyword}`;
};

export const genCardsData = (words: string[]): CardData[] => {
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
  // return shuffleArr(data);
};

export const actionByState = (
  targets: HTMLElement[],
  state: string,
  delay: number
): void => {
  setTimeout(() => {
    targets.forEach((target) => _actionByState({ target, state }));
  }, delay);
};

const _actionByState = ({
  target,
  state,
}: {
  target: HTMLElement;
  state: string;
}): void => {
  target.style.animationDelay = '0s';

  switch (state) {
    case 'wrong':
      target.classList.remove('open');
      break;

    case 'right':
      target.classList.add('hide');
      break;

    default:
      return;
  }
};

export const isSameCard = (cardEl1: Element, cardEl2: Element): boolean =>
  cardEl1.getAttribute('key') === cardEl2.getAttribute('key');

export const saveNumMove = (numMove: number): void => {
  const topMoves: number[] = JSON.parse(localStorage.getItem('topMoves') || '[]');
  let newTopMoves: number[] = [...topMoves];
  if (newTopMoves.length <  TOP_SCORE_RECORD) {
    newTopMoves.push(numMove);
  } else if (numMove < newTopMoves[newTopMoves.length - 1]){
    newTopMoves[newTopMoves.length - 1] = numMove;
  }
  localStorage.setItem('topMoves', JSON.stringify(newTopMoves.sort()));
};

const shuffleArr = (arr: any) =>
  [...arr].sort(() => Math.floor(Math.random() - 0.5));
