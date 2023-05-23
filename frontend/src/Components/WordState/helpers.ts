import { Itoken } from "./interfaces";

export const sentenceToLetterStates = (sentence: string): Itoken[] => {
  return sentence.split("").map((symbol) => ({
    symbol,
  }));
};

export function replaceWithNew<T>(
  array: T[],
  mutatedIndex: number,
  mutation: (item: T) => T,
) {
  return array.map((item, idx) =>
    idx === mutatedIndex ? mutation(item) : item,
  );
}

export function getLastIndex<T>(array: T[], key: (item: T) => boolean) {
  let last;
  array.forEach((item, index) => {
    if (key(item)) {
      last = index;
    }
  });
  return last ?? -1;
}

function flattenArrayOfObjects<T extends object>(array: T[]) {
  return array.reduce(
    (accumulator, current) => ({ ...current, ...accumulator }),
    {},
  );
}

export function convertPayload(tokens: Itoken[]) {
  const timings = flattenArrayOfObjects(
    tokens.map((currentToken, idx) => {
      if (idx === 0) {
        return {
          [`H_k${idx + 1}`]:
            currentToken.upTimestamp! - currentToken.downTimestamp!,
        };
      }
      const previousToken = tokens[idx - 1];

      return {
        [`DD_k${idx}_k${idx + 1}`]:
          currentToken.downTimestamp! - previousToken.downTimestamp!,
        [`DU_k${idx}_k${idx + 1}`]:
          currentToken.upTimestamp! - previousToken.upTimestamp!,
        [`H_k${idx + 1}`]:
          currentToken.upTimestamp! - currentToken.downTimestamp!,
      };
    }),
  );
  return {
    prompt: tokens.map((t) => t.symbol).join(""),
    ...timings,
  };
}
