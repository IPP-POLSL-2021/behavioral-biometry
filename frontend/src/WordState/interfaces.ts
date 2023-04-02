export type Itoken = {
  symbol: string,
  downTimestamp?: number,
  upTimestamp?: number,
}

export interface TokenProps extends Itoken {
  isCursorPresent: boolean,
};