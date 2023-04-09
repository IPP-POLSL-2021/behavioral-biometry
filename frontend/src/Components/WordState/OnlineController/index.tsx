import { useState, useEffect, useCallback } from "react";

import { Itoken } from '../interfaces'

import { convertPayload } from "../helpers";
import { useCookies } from "react-cookie";
import WordState from "..";

type connectionState = 'fetching' | 'fetched' | 'error'

const OnlineController = ({apiUrl, classNames}: {apiUrl: string, classNames?: string}) => {
  const [ connectionState, setConnectionState ] = useState<connectionState>('fetching')
  const [ prompt, setPrompt ] = useState<string>();
  const [ { access_token } ] = useCookies(["access_token"]);
  
  useEffect(() => {
    fetch(`${apiUrl}/prompt/default`, {
      headers: {Authorization: access_token, 'Content-Type': 'application/json'}}
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
  }, [apiUrl])

  const onCompleted = useCallback((letters: Itoken[]) => {
    // @ts-ignore
    const payload = convertPayload(letters)
    fetch(`${apiUrl}/prompt`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: access_token,
        'Content-Type': 'application/json'
      },
    })
  }, [apiUrl])

  if (connectionState == 'fetching') {
    return <span>loading</span>
  }

  if (connectionState == 'error') {
    return <span>error</span>
  }

  return <WordState classNames={classNames} word={prompt!} onCompleted={onCompleted} />
}

export default OnlineController;