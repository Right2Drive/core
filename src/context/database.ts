import * as MySQL from 'mysql';


const pool = MySQL.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

interface QueryReponse {
  results: any;
  fields: MySQL.IFieldInfo[];
}

/**
 * Create a a database connection
 */
function connect(): Promise<MySQL.IConnection> {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }

      resolve(connection);
    });
  });
}

/**
 * Query the database
 *
 * @param query {string} The SQL query
 */
export default function query(query: string): Promise<QueryReponse> {
  return new Promise((resolve, reject) => {
    connect()
      .then((connection) => {
        return new Promise((resolve, reject) => {
          connection.query(query, (err, results, fields) => {
            // Release the connection
            connection.release();

            // Check for error
            err && reject(err);

            resolve({ results, fields });
          });
        });
      });
  });
}
