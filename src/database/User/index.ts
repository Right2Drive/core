import database, { tableNames, normalize } from '@/database';
import logger from '@/utilities/logger';
import { DatabaseUser } from '@/models/User';

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

export const findOne = (username: string) => normalize<DatabaseUser>(core.findOne(username));
export const findOneHash = (username: string) => normalize<string>(core.findOneHash(username));
