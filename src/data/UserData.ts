import db from '../config/lokijs'
import { UserModel } from '../model/UserModel'
import { generateUniqueId } from '../utils/generateId'

const userCollection = db.addCollection<UserModel>('userCollection', { unique: ['_id'] })

const usersMock: Array<UserModel> = [
  {
    email: 'cloud.strife@gmail.com',
    name: 'Cloud Strife',
    pictureUrl: 'http://www.pictures.com/cloud',
    _id: generateUniqueId()
  },
  {
    email: 'zack.fair@gmail.com',
    name: 'Zack Fair',
    pictureUrl: 'http://pictures.com.br/zack',
    _id: generateUniqueId()
  },
  {
    email: 'tifa.lockhart@gmail.com',
    name: 'Tifa Lockhart',
    pictureUrl: 'http://www.pictures.com.br/tifa',
    _id: generateUniqueId()
  },
  {
    email: 'sephiroth@gmail.com',
    name: 'Sephiroth',
    pictureUrl: 'http://www.pictures.com.br/sephirot',
    _id: generateUniqueId()
  },
  {
    email: 'aerith@gmail.com',
    name: 'Aertih',
    pictureUrl: 'http://www.pictures.com.br/aertih',
    _id: generateUniqueId()
  }
]

userCollection.insert(usersMock)

export default userCollection
