import { v4 } from 'uuid'

export const generateUniqueId = () => {
  return v4().slice(0, 13)
}
