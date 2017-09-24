import { checkPassword } from '@/services/authentication/password';
import * as UserDb from '@/database/User';
import { DatabaseUser } from '@/models/User';
import { createToken } from '@/services/authentication/token';

/**
 * Authenticate a user, and return a jwt if they are successful
 *
 * @param username {string} User to check
 * @param password {string} Password to validate
 */
export function authenticate(username: string, password: string, findUser = UserDb.findOne) {
  const bluebird = findUser(username).then((user) => {
    return checkPassword(password, user.hash)
      .then((authenticated) => {
        if (authenticated) {
          return createToken(user.username, user.userType);
        }

        throw new Error('User not authenticated');
      });
  });

  return Promise.resolve<string>(bluebird);
}
