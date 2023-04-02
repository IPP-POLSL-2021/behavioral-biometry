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
