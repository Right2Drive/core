import database, { tableNames, execute } from '@/database';
import logger from '@/utilities/logger';
import { DatabaseUser } from '@/models/User';
import { UserType } from '@/models/User/UserType';

const userTable = () => database()(tableNames.USERS);

const builders = {
  selectFromUser(attributes: string, username: string) {
    return userTable().select(attributes).where({
      username,
    });
  },

  deleteUser(username: string) {
    return userTable().where({
      username,
    }).delete();
  },

  findUser(username: string) {
    return builders.selectFromUser('*', username);
  },

  findUserHash(username: string) {
    return builders.selectFromUser('hash', username);
  },

  createUser(username: string, hash: string, userType: UserType) {
    if (hash.indexOf('$') === -1) {
      throw new Error('Trying to store password in database');
    }

    return userTable().insert({
      username,
      hash,
      userType,
    });
  },
};

/* ***************** Helpers **********************/

function validateSingleUser(username: string, results: any[]) {
  if (results.length !== 1) {
    throw new Error(`Duplicate usernames in the database: ${username}`);
  }
}

/* ***************** Exports **********************/

/**
 * TODO: Document
 */
export async function findUser(username: string) {
  const results = await execute<DatabaseUser[]>(builders.findUser(username));
  validateSingleUser(username, results);
  return results.shift();
}

/**
 * TODO: Document
 */
export async function findUserHash(username: string) {
  const results = await execute<string[]>(builders.findUserHash(username));
  validateSingleUser(username, results);
  return results.shift();
}

/**
 * TODO: Document
 */
export function createUser(username: string, hash: string, userType: UserType) {
  return execute<void>(builders.createUser(username, hash, userType));
}

/**
 * TODO: Document
 */
export function deleteUser(username: string) {
  return execute<void>(builders.deleteUser(username));
}
