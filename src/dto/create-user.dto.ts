import { isStringObject } from 'util/types';

export class CreateUserDto {
  id: string;
  userName: string;

  password: string;
  firstName:string;
  lastName:string;
  email:string;
  phone: string;
}
