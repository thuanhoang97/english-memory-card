const CARD_ACTION_TIME = 600;

export enum CardType {
  IMAGE = 'IMAGE',
  WORD = 'WORD',
}

export type CardData = {
  type: CardType;
  content: string;
  key: string;
};

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
  return shuffleArr(data);
};

export const actionByState = (cardEl: Element): void => {
  const checkState = cardEl.getAttribute('check');
  switch (checkState) {
    case 'wrong':
      setTimeout(() => cardEl.classList.remove('open'), CARD_ACTION_TIME);
      break;

    case 'right':
      setTimeout(() => {
        cardEl.classList.add('hide');
      }, CARD_ACTION_TIME / 2);
      break;

    default:
      return;
  }
};

export const isSameCard = (cardEl1: Element, cardEl2: Element): boolean =>
  cardEl1.getAttribute('key') === cardEl2.getAttribute('key');

const shuffleArr = (arr: any) =>
  [...arr].sort(() => Math.floor(Math.random() - 0.5));
