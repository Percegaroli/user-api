import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UpdateUserDTO } from '../../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../../DTO/CreateUserRequestDTO'
import UserService from '../../service/UserService'
import { GetUserRequestQueryParams, GetUserListRequestParams } from './interface'

class UserController {
  public async get (req: Request<{}, {}, {}, GetUserRequestQueryParams>, res: Response) {
    const user = await UserService.getUser(req.query.email)
    if (user) {
      return res.status(StatusCodes.OK).send(user)
    }
    return res.status(StatusCodes.NOT_FOUND).send()
  }

  public async getList (req: Request<{}, {}, {}, GetUserListRequestParams>, res: Response) {
    const userList = await UserService.getUserList(req.params)
    return res.status(StatusCodes.OK).send(userList)
  }

  public async create (req: Request<{}, {}, CreateUserRequestDTO>, res: Response) {
    const user = await UserService.createUser(req.body)
    return res.status(StatusCodes.CREATED).send(user)
  }

  public async edit (req: Request<{}, {}, UpdateUserDTO, GetUserRequestQueryParams>, res: Response) {
    await UserService.editUser(req.body, req.query.email)
    return res.status(StatusCodes.NO_CONTENT).send()
  }

  public async delete () {

  }
}

export default new UserController()
