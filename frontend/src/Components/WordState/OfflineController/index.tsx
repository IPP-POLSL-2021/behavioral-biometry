import { useState, useCallback } from "react";

import { Itoken } from "../interfaces";

import { convertPayload } from "../helpers";
import WordState from "..";

const OfflineController = ({ prompt }: { prompt: string }) => {
  const onCompleted = useCallback((letters: Itoken[]) => {
    // @ts-ignore
    const payload = convertPayload(letters);
    console.log(payload);
  }, []);

  return <WordState word={prompt!} onCompleted={onCompleted} automatic />;
};

export default OfflineController;
