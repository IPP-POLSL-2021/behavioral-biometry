import { useEffect } from "react";
import WordStateView from "../WordStateView";
import { Itoken } from "../interfaces";

const AutomaticHandler = ({
  letters,
  setLetterDown,
  setLetterBackUp,
  onPromptFilled,
  classNames,
}: {
  classNames?: string;
  onPromptFilled: (items: Itoken[]) => void;
  letters: Itoken[];
  setLetterBackUp: () => void;
  setLetterDown: () => void;
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const c = Math.random();
      if (c > 0.3) {
        setLetterDown();
        setTimeout(setLetterBackUp, c * 100);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [setLetterDown, setLetterBackUp]);

  return (
    <WordStateView
      classNames={classNames}
      letters={letters}
      onCompleted={onPromptFilled}
    />
  );
};

export default AutomaticHandler;
