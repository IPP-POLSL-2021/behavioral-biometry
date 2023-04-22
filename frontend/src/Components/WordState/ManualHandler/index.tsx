import { useEffect } from "react";

import { Itoken } from "../interfaces";

import { getLastIndex } from "../helpers";

import WordStateView from "../WordStateView";

const ManualHandler = ({letters, setLetterDown, setLetterBackUp, onPromptFilled, classNames}: {onPromptFilled: (items: Itoken[]) => void, letters: Itoken[], setLetterDown: (idx: number) => void, setLetterBackUp: (idx: number) => void, classNames?: string}) => {
  const lastDownIndex = getLastIndex(letters, (letter) => Boolean(letter.downTimestamp)); // this should not be here. make it work on state based index
  
  const handleKeyDown = (event: KeyboardEvent) => {
    const letterIndex = letters.findIndex((letter, idx) => lastDownIndex === idx - 1 && event.key === letter.symbol && !letter.downTimestamp);
    if (letterIndex == -1) {
      return;
    }
    setLetterDown(letterIndex)
  }

  const handleKeyBackUp = (event: KeyboardEvent) => {
    const letterIndex = letters.findIndex(letter => event.key === letter.symbol && letter.downTimestamp && !letter.upTimestamp);
    if (letterIndex == -1) {
      return;
    }
    setLetterBackUp(letterIndex)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyBackUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyBackUp);
    };
  }, [handleKeyDown, handleKeyBackUp]);

  return (
    <WordStateView classNames={classNames} letters={letters} onCompleted={onPromptFilled}/>
  )
}

export default ManualHandler;
