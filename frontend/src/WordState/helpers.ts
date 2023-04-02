import { Iletter } from "./interfaces";

export const sentenceToLetterStates = (sentence: string): Iletter[] => {
  return sentence.split("").map(letter => ({
    letter,
  }));
}

export function replaceWithNew<T>(array: T[], mutatedIndex: number, mutation: (item: T) => T) {
  return array.map((item, idx) => idx === mutatedIndex ? mutation(item) : item);
}