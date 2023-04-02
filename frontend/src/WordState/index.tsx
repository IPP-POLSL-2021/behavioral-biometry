import { useState, useEffect, useCallback } from "react";

import { LetterProps, Iletter } from "./interfaces";

import { sentenceToLetterStates, replaceWithNew } from "./helpers";

import styles from "./style.module.scss";

const Letter: React.FC<LetterProps> = ({letter, downTimestamp, upTimestamp, isCursorPresent}) => {
  return (
    <span
      className={
        `${styles.letter} ${upTimestamp ? styles.letterUp : downTimestamp ? styles.letterDown : ''} ${isCursorPresent && styles.cursorPresent}`
      }
    >
      {letter}
    </span>
  )
}

const WordState = ({ word } : { word: string }) => {
  const [ letters, setLetters ] = useState(sentenceToLetterStates(word));

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    setLetters((current) => {
      const currentIndex = current.findIndex(letter => !letter.downTimestamp)
      if (currentIndex == -1) {
        return current;
      }
      if(event.key === current[currentIndex].letter) {
        return replaceWithNew(current, currentIndex, (item) => ({...item, downTimestamp: 1}))
      }
      return current;
    })
  }, [setLetters])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setLetters((current) => {
      const currentIndex = letters.findIndex(letter => letter.downTimestamp && !letter.upTimestamp)
      if (currentIndex == -1) {
        return current;
      }
      if(event.key === letters[currentIndex].letter) {
        return replaceWithNew(letters, currentIndex, (item) => ({...item, upTimestamp: 1}))
      }
      return current
    })
  }, [setLetters])

  const getLastDown = useCallback(() => {
    let last;
    letters.forEach((letter, index) => {
      if (letter.downTimestamp) {
        last = index;
      }
    })
    return last ?? -1;
  }, [letters])

  return (
    <div className={styles.word}>
      {letters?.map((letter, idx) => (
        <Letter key={`${letter.letter}_${idx}`} {...letter} isCursorPresent={idx === getLastDown()} />
      ))}
    </div>
  )
  /*
  return (
    <div className={styles.word}>
      <CursorState />
      <span className={styles.letter}>k</span>
      <span className={styles.letter}>r</span>
      <span className={styles.letter}>i</span>
      <span className={styles.letter}>s</span>
      <span className={styles.letter}>k</span>
      <span className={styles.letter}>r</span>
      <span className={styles.letter}>o</span>
      <span className={styles.letter}>s</span>
    </div>
  );
  */
};

export default WordState;
