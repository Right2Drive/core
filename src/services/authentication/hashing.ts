import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash and compare passwords
 */
export default {
  /**
   * Hash a password to store in database
   *
   * @param password {string} The password to hash
   */
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  /**
   * Compare the password provided by a user to the hashed password in the db
   *
   * @param password {string} Password to compare
   * @param hash {string} Hash to compare
   */
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },
};
