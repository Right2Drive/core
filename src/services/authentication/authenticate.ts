import { checkPassword } from '@/services/authentication/password';
import * as UserDb from '@/database/User';
import { DatabaseUser } from '@/models/User';
import { createToken } from '@/services/authentication/token';

const defaultFunctions = {
  createToken,
  findUser: UserDb.findOne,
};

/**
 * Authenticate a user, and return a jwt if they are successful
 *
 * @param {string} [username] User to check
 * @param {string} [password] Password to validate
 * @param {object} [injectedFunctions=defaultFunctions] Injected dependencies, for testing purposes
 */
export function authenticate(username: string, password: string, injectedFunctions = defaultFunctions) {
  const bluebird = injectedFunctions.findUser(username).then((user) => {
    return checkPassword(password, user.hash)
      .then((authenticated) => {
        if (authenticated) {
          return injectedFunctions.createToken(user.username, user.userType);
        }

        throw new Error('User not authenticated');
      });
  });

  return Promise.resolve<string>(bluebird);
}
