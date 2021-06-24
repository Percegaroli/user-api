import { GetUserListRequestParams } from '../controllers/UserController/interface'
import { UpdateUserDTO } from '../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../DTO/CreateUserRequestDTO'
import { UserResponseDTO } from '../DTO/UserResponseDTO'
import { UserModel } from '../model/UserModel'
import UserRepository from '../repository/UserRepository'
import { generateUniqueId } from '../utils/generateId'

class UserService {
  async getUser (email: string) {
    const user = await UserRepository.findByEmail(email)
    if (user) return this.createUserResponseDTO(user)
    return user
  }

  async getUserList ({ page = 0, quantity = 8 }: GetUserListRequestParams) {
    const offset = page * quantity
    const users = await UserRepository.findMany(quantity, offset)
    return users.map(this.createUserResponseDTO)
  }

  async createUser (userDTO: CreateUserRequestDTO) {
    const { name, email, pictureUrl } = userDTO
    const user: UserModel = {
      name,
      email,
      pictureUrl,
      _id: generateUniqueId()
    }
    const createdUser = await UserRepository.insert(user)
    if (createdUser) {
      return createdUser?._id
    }
    return createdUser
  }

  async editUser (userDTO: UpdateUserDTO, email: string) {
    const user = await UserRepository.findByEmail(email)
    console.log(user)
    if (user) {
      const updatedUser: UserModel = {
        email: user.email,
        name: userDTO.name ?? user.name,
        pictureUrl: userDTO.pictureUrl ?? user.pictureUrl,
        _id: user._id
      }
      UserRepository.update(updatedUser)
    }
  }

  private createUserResponseDTO (user: UserModel): UserResponseDTO {
    const { name, email, pictureUrl } = user
    return {
      name,
      email,
      pictureUrl,
      _id: user._id
    }
  }
}

export default new UserService()
