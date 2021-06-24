import userCollection from '../data/UserData'
import UserModel from '../model/UserModel'

class UserRepository {
  async findByEmail (email: string) {
    return userCollection.findOne({ email: email })
  }

  async findMany (quantity: number, offset: number) {
    return userCollection.chain().find().offset(offset).limit(quantity).data()
  }

  async insert (user: UserModel) {
    return userCollection.insert(user)
  }

  async remove (user: UserModel) {
    return userCollection.remove(user)
  }

  async findList () {
    return userCollection.find()
  }

  async update (user: UserModel) {
    return userCollection.update(user)
  }
}

export default new UserRepository()
