import { useState, useEffect } from "react";
import styles from "./style.module.scss";

const CursorState = () => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevState) => !prevState);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={`${styles.cursor} ${isBlinking ? styles.blinking_cursor : ""}`}
    >
      |
    </span>
  );
};

const WordState = () => {
  useEffect(() => {
    const letters = Array.from(document.getElementsByClassName(styles.letter));
    let idx = 0;
    document.addEventListener("keydown", (e) => {
      if (idx < letters.length && e.key === letters[idx].innerHTML) {
        letters[idx].classList.add(styles.correct);
        idx++;
      }
    });
  }, []);
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
};

export default WordState;
