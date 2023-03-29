import { TIMEOUT } from '../constants'

export const getMessageFromServer = (jp2gmd: boolean) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {jp2gmd ? resolve("Tak") : reject("Nie")}, TIMEOUT);
  })
}
