import { StatusCodes } from 'http-status-codes'
import { UpdateUserDTO } from '../../DTO/UpdateUserDTO'
import { CreateUserRequestDTO } from '../../DTO/CreateUserRequestDTO'
import UserService from '../../service/UserService'
import { Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa'
import { UserResponseDTO } from '../../DTO/UserResponseDTO'
import { GetUserListResponseDTO } from '../../DTO/GetUserListResponseDTO'
import { CreateUserResponseDTO } from '../../DTO/CreateUserResponseDTO'

@Route()
@Tags('users')
export class UserController extends Controller {
  /**
   * Retrieves page of users
   * @example page 1
   * @example limit 5
   * @param page Page number to be recovered, starting at index 1
   * @param limit Quantity of users by page
   */
  @Get('users')
  public async getList (
    @Query() page?: number,
    @Query() limit?: number
  ): Promise<GetUserListResponseDTO> {
    return UserService.getUserList({ limit, page})
  }

  /**
   * Retrieves a user by id
   * @param id User id
   */
  @Get('user/{id}')
  public async get (@Path() id: string): Promise<UserResponseDTO | null> {
    const user = UserService.getById(id)
    if (user) return user 
    this.setStatus(StatusCodes.NOT_FOUND)
    return null
  }

  /**
   * Creates a new user
   * @param requestBody 
   */
  @Post('user')
  @SuccessResponse(StatusCodes.CREATED)
  public async create (@Body() requestBody: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user =  UserService.createUser(requestBody)
    this.setStatus(StatusCodes.CREATED)
    return user
  }

  /**
   * Updates user info. 
   * @param id User id
   * @param requestBody 
   */
  @Patch('user/{id}')
  public async edit (
    @Path() id: string,
    @Body() requestBody: UpdateUserDTO,
  ) {
    const hasSucceded = await UserService.editUser(requestBody, id)
    this.setStatus(hasSucceded ? StatusCodes.NO_CONTENT : StatusCodes.NOT_FOUND)
    return
  }

  /**
   * Deletes a user by id
   * @param id User id
   */
  @Delete('user/{id}')
  public async delete (@Path() id: string): Promise<void> {
    const hasSucceded = await UserService.deleteUser(id)
    this.setStatus(hasSucceded ? StatusCodes.NO_CONTENT : StatusCodes.NOT_FOUND)
    return 
  }
}

export default new UserController()
