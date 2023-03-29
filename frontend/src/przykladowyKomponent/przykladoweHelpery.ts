import { TIMEOUT } from '../constants'

export const getMessageFromServer = () => {
  return Promise.resolve(() => {
    return setTimeout(() => "Jebać disa", TIMEOUT)
  })
}