export type Iletter = {
  letter: string,
  downTimestamp?: number,
  upTimestamp?: number,
}

export interface LetterProps extends Iletter {
  isCursorPresent: boolean;
};