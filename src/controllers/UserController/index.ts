import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UpdateUserDTO } from '../../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../../DTO/CreateUserRequestDTO'
import UserService from '../../service/UserService'
import { GetUserListRequestParams, BaseRequestParams } from './interface'

class UserController {
  public async get (req: Request<BaseRequestParams>, res: Response) {
    const user = await UserService.getById(req.params.id)
    if (user) {
      return res.status(StatusCodes.OK).send(user)
    }
    return res.status(StatusCodes.NOT_FOUND).send()
  }

  public async getList (req: Request<{}, {}, {}, GetUserListRequestParams>, res: Response) {
    const userList = await UserService.getUserList(req.query)
    return res.status(StatusCodes.OK).send(userList)
  }

  public async create (req: Request<{}, {}, CreateUserRequestDTO>, res: Response) {
    const user = await UserService.createUser(req.body)
    return res.status(StatusCodes.CREATED).send(user)
  }

  public async edit (req: Request<BaseRequestParams, {}, UpdateUserDTO>, res: Response) {
    await UserService.editUser(req.body, req.params.id)
    return res.status(StatusCodes.NO_CONTENT).send()
  }

  public async delete (req: Request<BaseRequestParams>, res: Response) {
    const hasDeleted = await UserService.deleteUser(req.params.id)
    return res.status(hasDeleted ? StatusCodes.NO_CONTENT : StatusCodes.NOT_FOUND).send()
  }
}

export default new UserController()
