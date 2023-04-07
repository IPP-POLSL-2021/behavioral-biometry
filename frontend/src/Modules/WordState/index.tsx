import { useState, useEffect, useCallback } from "react";

import { TokenProps, Itoken } from "./interfaces";

import { sentenceToLetterStates, replaceWithNew, getLastIndex, convertPayload } from "./helpers";

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

const WordState: React.FC<{word: string, onCompleted: (letters: Itoken[]) => void}> = ({ word, onCompleted }) => {
  const [ letters, setLetters ] = useState(sentenceToLetterStates(word));
  const lastDownIndex = getLastIndex(letters, (letter) => Boolean(letter.downTimestamp));
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentIndex = letters.findIndex((letter, idx) => lastDownIndex === idx - 1 && event.key === letter.symbol && !letter.downTimestamp);
    if (currentIndex == -1) {
      return;
    }
    setLetters(
      replaceWithNew(letters, currentIndex, (item) => ({...item, downTimestamp: new Date().getTime()}))
    );
  }, [letters]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const currentIndex = letters.findIndex(letter => event.key === letter.symbol && letter.downTimestamp && !letter.upTimestamp);
    if (currentIndex == -1) {
      return;
    }
    setLetters(replaceWithNew(letters, currentIndex, (item) => ({...item, upTimestamp: new Date().getTime()})));
  }, [letters]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if(letters.every(v => v.downTimestamp && v.upTimestamp)) {
      onCompleted(letters)
      setLetters(sentenceToLetterStates(word))
    }
  }, [letters])

  return (
    <main className={styles.main}>
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
    </main>
  )
};

export default WordState;
