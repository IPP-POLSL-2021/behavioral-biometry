import { useState, useEffect, useCallback } from "react";

import { Itoken } from '../interfaces'

import { convertPayload } from "../helpers";
import { useCookies } from "react-cookie";
import WordState from "..";

type connectionState = 'fetching' | 'fetched' | 'error'

const OnlineController = ({apiUrl, classNames, onFinished, continueAfter, restartOnCompleted}: {continueAfter?: boolean, apiUrl: string, classNames?: string, onFinished?: (letters: Itoken[]) => void, restartOnCompleted?: boolean}) => {
  const [ connectionState, setConnectionState ] = useState<connectionState>('fetching')
  const [ prompt, setPrompt ] = useState<string | null>(null);
  const [ { access_token } ] = useCookies(["access_token"]);

  const fetchNew = useCallback(() => {
    fetch(apiUrl, {
      headers: {Authorization: access_token, 'Content-Type': 'application/json'}
    }
    )
    .then(response => response.text())
    .then(prompt => {
      setConnectionState('fetched')
      if(!prompt) {
        setPrompt(null)
      }
      setPrompt(prompt)
    })
    .catch(() => {
      setConnectionState('error')
    })
  }, [apiUrl])

  useEffect(() => {
    fetchNew()
  }, [fetchNew])

  const onCompleted = useCallback((letters: Itoken[]) => {
    onFinished && onFinished(letters);
    if(continueAfter) {
      fetchNew();
    }
  }, [fetchNew, onFinished, continueAfter])

  if (connectionState == 'fetching') {
    return <span>loading</span>
  }

  if (connectionState == 'error') {
    return <span>error</span>
  }

  if (!prompt) {
    return <span>auth complete</span>
  }
  return <WordState restartOnCompleted={restartOnCompleted} classNames={classNames} word={prompt!} onCompleted={onCompleted} />
}

export default OnlineController;