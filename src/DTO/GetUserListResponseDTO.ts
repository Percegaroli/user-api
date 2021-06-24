import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { UserResponseDTO } from "./UserResponseDTO";

export type GetUserListResponseDTO = PaginatedResponse<UserResponseDTO>