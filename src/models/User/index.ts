import { UserType } from '@/models/User/UserType';

interface User {
  [k: string]: any;
  username: string;
  userType: UserType;
}

export interface DatabaseUser extends User {
  hash: string;
}

export interface CreationUser extends User {
  password: string;
}