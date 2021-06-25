/**
 * @example {
 *  "_id": "e532645a-46e6"
 *  "name": "Cloud Strife",
 *  "email": "cloud.strife@gmail.com",
 *  "pictureUrl": "http://www.picture.com.br/cloud"
 * }
 */
export interface UserResponseDTO {
  name: string;
  email: string;
  pictureUrl: string;
  _id: string;
}