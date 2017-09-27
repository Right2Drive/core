import * as knex from 'knex';

import Table from '@/models/Database/Table';
import logger from '@/utilities/logger';

/*
* Here we create our connection to the database. For demonstration purposes, this is
* done using knex, but you can easily swap it out with your own database connection.
*/

let db: knex = null;

export function connect() {
  db = knex({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  });
}

export const tableNames: Readonly<Table> = {
  USERS: 'users',
};

/**
 * Execute the query and normalize to an ES6 promise
 *
 * @param {QueryBuilder} [qb] The query builder to normalize
 */
export function execute<T>(qb: knex.QueryBuilder): Promise<T> {
  // Use Promise.resolve to normalize to regualar ES6 Promise
  return Promise.resolve(
    // Call `then` merely to start the query to the database
    qb.then(v => v),
  );
}

/**
 * Database Query API
 */
export default function database() {
  if (!db) {
    throw new Error('Database connection has not been initialized');
  }
  return db;
}
