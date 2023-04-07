import { useState, useCallback } from "react";

import WordState from '..';
import { Itoken } from '../interfaces'

import { convertPayload } from "../helpers";

// Przykład tego co oddzielenie logiki view / controller pozwala zrobić

const OfflineController = () => {
  const [ prompt, ] = useState<string>('.tie5ronal');

  const onCompleted = useCallback((letters: Itoken[]) => {
    // @ts-ignore
    const payload = convertPayload(letters)
    console.log(payload)
  }, [])

  return <WordState word={prompt!} onCompleted={onCompleted} />
}

export default OfflineController;