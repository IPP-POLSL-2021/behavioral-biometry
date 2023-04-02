import { useState, useEffect, useCallback, useRef } from "react";

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

const WordState: React.FC<{word: string}> = ({ word }) => {
  const [ letters, setLetters ] = useState(sentenceToLetterStates(word));
  const [testState, setTestState] = useState(0)
  const lastDownIndex = getLastIndex(letters, (letter) => Boolean(letter.downTimestamp));
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentIndex = letters.findIndex((letter, idx) => lastDownIndex === idx - 1 && event.key === letter.symbol && !letter.downTimestamp);
    if (currentIndex == -1) {
      return;
    }
    console.log(lastDownIndex)
    setLetters(
      replaceWithNew(letters, currentIndex, (item) => ({...item, downTimestamp: Date.now()}))
    );
  }, [letters, testState]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const currentIndex = letters.findIndex(letter => event.key === letter.symbol && letter.downTimestamp && !letter.upTimestamp);
    if (currentIndex == -1) {
      return;
    }
    setLetters(replaceWithNew(letters, currentIndex, (item) => ({...item, upTimestamp: Date.now()})));
  }, [letters]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

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
