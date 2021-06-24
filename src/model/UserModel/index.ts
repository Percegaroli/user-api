/* class UserModel {
  name: string
  email: string
  pictureUrl: string

  constructor (name: string, email: string, pictureUrl: string) {
    this.name = name
    this.email = email
    this.pictureUrl = pictureUrl
  }
}

export default UserModel
*/

import { LokiObject } from '../../interfaces/LokiObject'

export interface User {
  name: string;
  email: string;
  pictureUrl: string;
}

export type UserModel = User & LokiObject
