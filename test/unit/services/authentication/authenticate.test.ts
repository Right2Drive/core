import { authenticate } from '@/services/authentication/authenticate';
import { findOne } from '@/database/User';
import { DatabaseUser } from '@/models/User';
import { UserType } from '@/models/User/UserType';

describe('authentication service authenticate module', function () {
  const username = 'username';
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';
  const simpleHash = '$2a$11$mkIzes44pQ96o/l/lEUhJewwAGhiQva3HC2lTelnx6NlcKP2LPnu2';
  const complexHash = '$2a$11$xNyDJJcxz5Xu.J3V6CRS6uxqbt1oTKp.sGeToI9WqwLluaAKIXnia';
  let fakeUser: DatabaseUser;
  let findUser: typeof findOne;

  before(function () {
    // Define the findUser function
    findUser = (username: string) => new Promise((resolve) => {
      setTimeout(() => resolve(), 0);
    });
  });

  describe('should successfully authenticate', function () {

    it('with simple password', function (done) {
      test(simplePassword, simpleHash, done);
    });

    it('with complex password', function (done) {
      test(complexPassword, complexHash, done);
    });

    function test(password: string, hash: string, done: MochaDone) {
      setupUser(username, hash, UserType.BASIC);
      authenticate(username, password, findOne)
        .then((token) => {
          done();
        })
        .catch(err => done(err));
    }
  });

  describe('should return a token', function () {

    it('with the correct user type', function (done) {
      setupUser(username, simpleHash, UserType.BASIC);
      authenticate(username, simplePassword, findOne)
        .then((token) => {
          done('incomplete');
        })
        .catch(err => done(err));
    });
  });

  describe('should fail to authenticate', function () {

  });

  function setupUser(
    username: string,
    hash: string,
    userType: UserType,
  ) {
    fakeUser = {
      username,
      hash,
      userType,
    };
  }
});
