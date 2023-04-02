import { useState, useEffect } from "react";

import { TokenProps } from "./interfaces";

import { sentenceToLetterStates, replaceWithNew, getLastIndex } from "./helpers";

import styles from "./style.module.scss";

const Token: React.FC<TokenProps> = ({symbol, downTimestamp, upTimestamp, isCursorPresent}) => {
  const classNames = `
    ${styles.letter}
    ${upTimestamp ? styles.letterUp : downTimestamp ? styles.letterDown : ''}
    ${isCursorPresent && styles.cursorPresent}
  `;

  return (
    <span
      className={classNames}
    >
      {symbol}
    </span>
  )
}

const WordState = ({ word } : { word: string }) => {
  const [ letters, setLetters ] = useState(sentenceToLetterStates(word));

  const lastDownIndex = getLastIndex(letters, (letter) => Boolean(letter.downTimestamp));

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    setLetters((current) => {
      const lastDownIndex = getLastIndex(current, (v) => Boolean(v.downTimestamp));
      const currentIndex = current.findIndex((letter, idx) => lastDownIndex === idx - 1 && event.key === letter.symbol && !letter.downTimestamp);
      if (currentIndex == -1) {
        return current;
      }
      return replaceWithNew(current, currentIndex, (item) => ({...item, downTimestamp: Date.now()}));
    });
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setLetters((current) => {
      const currentIndex = current.findIndex(letter => event.key === letter.symbol && letter.downTimestamp && !letter.upTimestamp);
      if (currentIndex == -1) {
        return current;
      }
      return replaceWithNew(current, currentIndex, (item) => ({...item, upTimestamp: Date.now()}));
    });
  };

  return (
    <div className={`${styles.word}`}>
      <Token symbol="" isCursorPresent={lastDownIndex === -1} />
      {letters?.map((letter, idx) => (
        <Token
          key={`${letter.symbol}_${idx}`}
          isCursorPresent={idx === lastDownIndex}
          {...letter}
        />
      ))}
    </div>
  )
};

export default WordState;
