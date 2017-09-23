import database, { tableNames } from '@/database';
import logger from '@/utilities/logger';

const userTable = () => database()(tableNames.USERS);

const core = {
  selectOne(select: string, username: string) {
    return userTable().select(select).where({
      username,
    });
  },

  findOne(username: string) {
    return core.selectOne('*', username);
  },

  findOneHash(username: string) {
    return core.selectOne('hash', username);
  },
};

export const findOne = (username: string) => core.findOne(username).then;
export const findOneHash = (username: string) => core.findOneHash(username).then;
