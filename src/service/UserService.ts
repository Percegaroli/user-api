import { GetUserListRequestParams } from '../controllers/UserController/interface'
import { UpdateUserDTO } from '../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../DTO/CreateUserRequestDTO'
import { UserResponseDTO } from '../DTO/UserResponseDTO'
import { UserModel } from '../model/UserModel'
import UserRepository from '../repository/UserRepository'
import { generateUniqueId } from '../utils/generateId'
import { CreateUserResponseDTO } from '../DTO/CreateUserResponseDTO'
import { GetUserListResponseDTO } from '../DTO/GetUserListResponseDTO'

class UserService {
  async getById (id: string) {
    const user = await UserRepository.findById(id)
    return user ? this.createUserResponseDTO(user) : user
  }

  async getUserList ({ page = 1, limit = 8 }: GetUserListRequestParams): Promise<GetUserListResponseDTO> {
    console.log('aqui')
    if (limit === 0) limit = 8;
    const offset = limit * (page - 1);
    const [ users, dataCount ] = await Promise.all([
      UserRepository.findMany(limit, offset),
      UserRepository.getDataCount()
    ])
    const userDTOs = users.map(this.createUserResponseDTO)
    return {
      count: Math.round(dataCount / limit ),
      data: userDTOs
    }
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

  async editUser (userDTO: UpdateUserDTO, id: string): Promise<boolean> {
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
      return true;
    }
    return false;
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
