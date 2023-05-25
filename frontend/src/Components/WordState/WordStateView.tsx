import { useEffect } from "react";

import { TokenProps, Itoken } from "./interfaces";

import { getLastIndex } from "./helpers";

import styles from "./style.module.scss";

const Token: React.FC<TokenProps> = ({
  symbol,
  downTimestamp,
  upTimestamp,
  isCursorPresent,
}) => {
  const classNames = `
    ${styles.letter}
    ${upTimestamp ? styles.letterUp : downTimestamp ? styles.letterDown : ""}
    ${isCursorPresent && styles.cursorPresent}
    ${symbol === " " && styles.space}
  `;

  return <span className={classNames}>{symbol}</span>;
};

const WordStateView: React.FC<{
  letters: Itoken[];
  onCompleted: (letters: Itoken[]) => void;
  classNames?: string;
}> = ({ letters, onCompleted, classNames }) => {
  const lastDownIndex = getLastIndex(letters, (letter) =>
    Boolean(letter.downTimestamp),
  );
  useEffect(() => {
    if (letters.every((v) => v.downTimestamp && v.upTimestamp)) {
      onCompleted(letters);
    }
  }, [letters]);

  return (
    <div className={`${styles.word} ${classNames ?? ""}`}>
      <Token symbol="" isCursorPresent={lastDownIndex === -1} />
      {letters?.map((letter, idx) => (
        <Token
          key={`${letter.symbol}_${idx}`}
          isCursorPresent={idx === lastDownIndex}
          {...letter}
        />
      ))}
    </div>
  );
};

export default WordStateView;
