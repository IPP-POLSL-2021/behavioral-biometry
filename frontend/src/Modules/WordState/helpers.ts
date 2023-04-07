import { Itoken } from "./interfaces";

export const sentenceToLetterStates = (sentence: string): Itoken[] => {
  return sentence.split("").map(symbol => ({
    symbol,
  }));
};

export function replaceWithNew<T>(array: T[], mutatedIndex: number, mutation: (item: T) => T) {
  return array.map((item, idx) => idx === mutatedIndex ? mutation(item) : item);
};

export function getLastIndex<T>(array: T[], key: (item: T) => boolean) {
  let last;
  array.forEach((item, index) => {
    if (key(item)) {
      last = index;
    }
  });
  return last ?? -1;
};

const translateTokenSymbol = (tokenSymbol: string) => {
  return {
    '.': 'period',
    '5': 'five',
  }[tokenSymbol] ?? tokenSymbol
}

function flattenArrayOfObjects(array: any[]) {
  return array.reduce(((accumulator, current) => ({...current, ...accumulator})), {})
}

export function convertPayload(tokens: Required<Itoken>[]) {
  return flattenArrayOfObjects(tokens.map((currentToken, idx) => {
    if (idx === 0) {
      const firstTokenSymbol = translateTokenSymbol(currentToken.symbol)
      return {
        [`H_${firstTokenSymbol}`]: currentToken.upTimestamp - currentToken.downTimestamp
      }
    }
    const previousToken = tokens[idx-1];
    const previousTokenSymbol = translateTokenSymbol(previousToken.symbol);
    const currentTokenSymbol = translateTokenSymbol(currentToken.symbol);
    
    return {
      [`DD_${previousTokenSymbol}_${currentTokenSymbol}`]: currentToken.downTimestamp - previousToken.downTimestamp,
      [`DU_${previousTokenSymbol}_${currentTokenSymbol}`]: currentToken.upTimestamp - previousToken.upTimestamp,
      [`H_${currentTokenSymbol}`]: currentToken.upTimestamp - currentToken.downTimestamp,
    }
  }))
} 
