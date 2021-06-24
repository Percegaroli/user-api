import { GetUserListRequestParams } from '../controllers/UserController/interface'
import { UpdateUserDTO } from '../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../DTO/CreateUserRequestDTO'
import { UserResponseDTO } from '../DTO/UserResponseDTO'
import { UserModel } from '../model/UserModel'
import UserRepository from '../repository/UserRepository'
import { generateUniqueId } from '../utils/generateId'
import { CreateUserResponseDTO } from '../DTO/CreateUserResponseDTO'

class UserService {
  async getById (id: string) {
    const user = await UserRepository.findById(id)
    return user ? this.createUserResponseDTO(user) : user
  }

  async getUserList ({ page = 0, quantity = 8 }: GetUserListRequestParams) {
    const offset = page * quantity
    const users = await UserRepository.findMany(quantity, offset)
    return users.map(this.createUserResponseDTO)
  }

  async createUser (userDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const { name, email, pictureUrl } = userDTO
    const user: UserModel = {
      name,
      email,
      pictureUrl,
      _id: generateUniqueId()
    }
    const createdUser = await UserRepository.insert(user)
    return {
      _id: createdUser?._id ?? ''
    }
  }

  async editUser (userDTO: UpdateUserDTO, id: string) {
    const user = await UserRepository.findById(id)
    if (user) {
      const updatedUser = {
        ...user,
        email: user.email,
        name: userDTO.name ?? user.name,
        pictureUrl: userDTO.pictureUrl ?? user.pictureUrl,
        _id: user._id
      }
      UserRepository.update(updatedUser)
    }
  }

  async deleteUser (id: string): Promise<boolean> {
    const user = await UserRepository.findById(id)
    if (user) {
      UserRepository.delete(user)
      return true
    }
    return false
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
