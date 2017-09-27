import database, { tableNames, execute } from '@/database';
import logger from '@/utilities/logger';
import { DatabaseUser } from '@/models/User';

const userTable = () => database()(tableNames.USERS);

const builders = {
  selectFromUser(attributes: string, username: string) {
    return userTable().select(attributes).where({
      username,
    });
  },

  findUser(username: string) {
    return builders.selectFromUser('*', username);
  },

  findUserHash(username: string) {
    return builders.selectFromUser('hash', username);
  },
};

export const findUser = (username: string) => execute<DatabaseUser>(builders.findUser(username));
export const findUserHash = (username: string) => execute<string>(builders.findUserHash(username));
