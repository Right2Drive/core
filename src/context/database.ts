import * as MySQL from 'mysql';
import { Observable } from '@reactivex/rxjs';

const connection = MySQL.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Create an observable to watch for errors
export const connect = Observable.bindCallback<MySQL.IError>(connection.connect);

export default connection;
