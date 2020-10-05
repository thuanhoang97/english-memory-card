import React, { useState } from 'react';
import './words.scss';

export const NUM_WORD_REQUIRE = 8;

type Props = {
  words: string[];
  setWords: (words: string[]) => void;
};

const WordsList: React.FC<Props> = ({ words, setWords }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newWord = e.currentTarget.value;
      if (words.find((w) => w === newWord)) {
        setErrors(['Word exists!!!']);
      } else if (words.length === NUM_WORD_REQUIRE) {
        setErrors(['Enough words!!!']);
      } else {
        setWords([...words, newWord]);
        e.currentTarget.value = '';
        setErrors([]);
      }
    }
  };

  const handleRemoveWord = (word: string) => {
    setWords(words.filter((w) => w !== word));
  };

  return (
    <div className="words">
      <p className="note">Enter {NUM_WORD_REQUIRE} english words to start!!!</p>
      <input
        type="text"
        placeholder="Add word"
        className="input"
        onKeyDown={handleKeyDown}
      />
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((err) => (
            <li className="error" key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}
      <ol className="items">
        {words.map((word) => (
          <li
            className="item"
            key={word}
            onClick={() => handleRemoveWord(word)}>
            {word}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WordsList;
