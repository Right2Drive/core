import * as MySQL from 'mysql';
import { Observable } from '@reactivex/rxjs';

type ConnectCallback = (err: MySQL.IError, ...args: any[]) => void;

const connection = MySQL.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const connectOptions = {};

// Create an observable to watch for errors
export const connect = Observable.bindCallback((cb: ConnectCallback) => {
  connection.connect(connectOptions, cb);
});

export default connection;
