import { LokiObject } from '../../interfaces/LokiObject'
export interface User {
  name: string;
  email: string;
  pictureUrl: string;
}

export type UserModel = User & LokiObject
