import { checkPassword } from '@/services/authentication/password';
import { findUser } from '@/database/User';
import { DatabaseUser } from '@/models/User';
import { createToken } from '@/services/authentication/token';
import logger from '@/utilities/logger';

/**
 * Authenticate a user, and return a jwt if they are successful
 *
 * @param {string} [username] User to check
 * @param {string} [password] Password to validate
 * @param {object} [injectedFunctions=defaultFunctions] Injected dependencies, for testing purposes
 */
export function authenticate(username: string, password: string) {
  const userPromise = findUser(username).then((user) => {
    return checkPassword(password, user.hash)
      .then((authenticated) => {
        if (authenticated) {
          return createToken(user.username, user.userType);
        }

        logger.error('User not authenticated');
      });
  });

  return Promise.resolve<string>(userPromise);
}
