import { useState, useEffect, useCallback } from "react";

import WordState from '..';
import { Itoken } from '../interfaces'

import { convertPayload } from "../helpers";

const tempToken = '08db36d8-e7a2-406b-8a44-28152f77dce1'
type connectionState = 'fetching' | 'fetched' | 'error'

const WordStateConnection = () => {
  const [ connectionState, setConnectionState ] = useState<connectionState>('fetching')
  const [ prompt, setPrompt ] = useState<string>();
  
  useEffect(() => {
    fetch("http://localhost:5050/api/prompt/default", {
      headers: {Authorization: tempToken, 'Content-Type': 'application/json'}}
    )
    .then(response => response.text())
    .then(prompt => {
      setConnectionState('fetched')
      setPrompt(prompt)
    })
    .catch(error => {
      setConnectionState('error')
      console.log(error);
    })
  }, [])

  const onCompleted = useCallback((letters: Itoken[]) => {
    // @ts-ignore
    const payload = convertPayload(letters)
    fetch("http://localhost:5050/api/prompt", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: tempToken,
        'Content-Type': 'application/json'
      },
    })
  }, [])

  if (connectionState == 'fetching') {
    return <span>loading</span>
  }

  if (connectionState == 'error') {
    return <span>error</span>
  }

  return <WordState word={prompt!} onCompleted={onCompleted} />
}

export default WordStateConnection;