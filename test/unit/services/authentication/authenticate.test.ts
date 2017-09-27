import { expect } from 'chai';

import { authenticate } from '@/services/authentication/authenticate';
import { findUser } from '@/database/User';
import { DatabaseUser } from '@/models/User';
import { UserType } from '@/models/User/UserType';
import { createToken } from '@/services/authentication/token';

interface InjectedFunctions {
  findUser: typeof findUser;
  createToken: typeof createToken;
}

describe('authentication service authenticate module', function () {
  const fakeToken = 'myVeryFakeToken';
  const username = 'username';
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';
  const simpleHash = '$2a$11$mkIzes44pQ96o/l/lEUhJewwAGhiQva3HC2lTelnx6NlcKP2LPnu2';
  const complexHash = '$2a$11$xNyDJJcxz5Xu.J3V6CRS6uxqbt1oTKp.sGeToI9WqwLluaAKIXnia';
  let fakeUser: DatabaseUser;
  let injectedFunctions: InjectedFunctions;

  before(function () {
    // Define the injected functions
    injectedFunctions = {
      findUser: (username: string) => Promise.resolve(fakeUser),
      createToken: () => Promise.resolve(fakeToken),
    };
  });

  describe('should successfully authenticate and return token', function () {

    it('with simple password', async function () {
      return test(simplePassword, simpleHash);
    });

    it('with complex password', async function () {
      return test(complexPassword, complexHash);
    });

    async function test(password: string, hash: string) {
      setupUser(username, hash, UserType.BASIC);
      const token = await authenticate(username, password, injectedFunctions);
      expect(token).to.be.eq(fakeToken);
    }
  });

  describe('should fail to authenticate', function () {
    it('with simple password', async function () {
      setupUser(username, simpleHash, UserType.BASIC);
      let token: string;
      try {
        token = await authenticate(username, 'wrong_password', injectedFunctions);
      } catch (err) {
        return;
      }
      throw new Error('Should not have authenticated user');
    });
  });

  function setupUser(username: string, hash: string, userType: UserType) {
    fakeUser = {
      username,
      hash,
      userType,
    };
  }
});
