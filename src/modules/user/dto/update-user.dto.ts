import { UserType } from '../../../types/user-type.enum.js';

export default class UpdateUserDto {
  public name?: string;
  public avatarPath?: string;
  public userType?: UserType;
}
