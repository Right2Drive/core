import { UserType } from '@/models/User/UserType';

export default interface User {
  username: string;
  password?: string;
  userType: UserType;
}
