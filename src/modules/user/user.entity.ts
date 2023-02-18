import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarPath = data.avatarPath ?? '';
    this.userType = data.userType;
  }

  @prop({
    required: true,
    default: '',
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
    default: '',
  })
  public email!: string;

  @prop({
    default: '',
  })
  public avatarPath!: string;

  @prop({
    required: true,
    default: '',
  })
  private password!: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType,
    default: UserType.Common,
  })
  public userType!: UserType;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
