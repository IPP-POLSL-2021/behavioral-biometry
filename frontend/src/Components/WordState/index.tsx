import { useState, useCallback, useEffect } from "react";

import { Itoken } from "./interfaces";

import { sentenceToLetterStates, replaceWithNew, getLastIndex } from "./helpers";
import AutomaticHandler from "./AutomaticHandler";
import ManualHandler from "./ManualHandler";

const WordState = ({word, onCompleted, automatic, classNames, restartOnCompleted}: {word: string, onCompleted: (tokens: Itoken[]) => void, automatic?: boolean, classNames?: string, restartOnCompleted?: boolean}) => {
  const [ letters, setLetters ] = useState(sentenceToLetterStates(word));
  const lastDownIndex = getLastIndex(letters, (letter) => Boolean(letter.downTimestamp)); // this should not be here. make it work on state based index
  const lastUpIndex = getLastIndex(letters, (letter) => Boolean(letter.upTimestamp));
  
  const setLetterDown = useCallback((index: number = lastDownIndex + 1) => {
    setLetters(letters => replaceWithNew(letters, index, (item) => ({...item, downTimestamp: new Date().getTime()})));
  }, [letters]);

  useEffect(() => {
    setLetters(sentenceToLetterStates(word));
  }, [word])

  const setLetterBackUp = useCallback((index: number = lastUpIndex + 1) => {
    setLetters(letters => replaceWithNew(letters, index, (item) => ({...item, upTimestamp: new Date().getTime()})));
  }, [letters]);

  const onPromptFilled = (tokens: Itoken[]) => {
    restartOnCompleted && setLetters(sentenceToLetterStates(word))
    onCompleted(tokens)
  }

  if(automatic) {
    return (
      <AutomaticHandler classNames={classNames} letters={letters} onPromptFilled={onPromptFilled} setLetterBackUp={setLetterBackUp} setLetterDown={setLetterDown} />
    )
  }
  return (
    <ManualHandler classNames={classNames} letters={letters} onPromptFilled={onPromptFilled} setLetterDown={setLetterDown} setLetterBackUp={setLetterBackUp}/>
  )
}

export default WordState;