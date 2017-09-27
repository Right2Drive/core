import { expect } from 'chai';
import * as td from 'testdouble';
import * as path from 'path';

import { authenticate } from '@/services/authentication/authenticate';
import * as UserDb from '@/database/User';
import * as TokenAuth from '@/services/authentication/token';
import * as PasswordAuth from '@/services/authentication/password';
import { DatabaseUser } from '@/models/User';
import { UserType } from '@/models/User/UserType';

interface MockObjects {
  fakeUser?: DatabaseUser;
  fakeToken: string;
}

interface MockFunctions {
  findUser: typeof UserDb.findUser;
  createToken: typeof TokenAuth.createToken;
  checkPassword: typeof PasswordAuth.checkPassword;
}

describe('authentication service authenticate module', function () {
  const username = 'username';
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';
  const simpleHash = '$2a$11$mkIzes44pQ96o/l/lEUhJewwAGhiQva3HC2lTelnx6NlcKP2LPnu2';
  const complexHash = '$2a$11$xNyDJJcxz5Xu.J3V6CRS6uxqbt1oTKp.sGeToI9WqwLluaAKIXnia';
  let mockObjects: MockObjects;
  let mockFunctions: MockFunctions;

  beforeEach(function () {
    // Define the mocked objects
    mockObjects = {
      fakeToken: 'myVeryFakeToken',
    };

    // Define the mocked functions
    mockFunctions = {
      findUser: td.replace(UserDb, 'findUser'),
      createToken: td.replace(TokenAuth, 'createToken'),
      checkPassword: td.replace(PasswordAuth, 'checkPassword'),
    };

    td.when(mockFunctions.createToken(username, UserType.BASIC)).thenResolve(mockObjects.fakeToken);
    td.when(mockFunctions.checkPassword(simplePassword, simpleHash)).thenResolve(true);
    td.when(mockFunctions.checkPassword(complexPassword, complexHash)).thenResolve(true);
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
      const token = await authenticate(username, password);
      expect(token).to.be.eq(mockObjects.fakeToken);
    }
  });

  describe('should fail to authenticate', function () {
    const badPassword = 'wrong_password';

    beforeEach(function () {
      td.when(mockFunctions.checkPassword(username, badPassword)).thenResolve(false);
    });

    it('with simple password', async function () {
      setupUser(username, simpleHash, UserType.BASIC);
      let token: string;
      try {
        token = await authenticate(username, badPassword);
      } catch (err) {
        return;
      }
      throw new Error('Should not have authenticated user');
    });
  });

  function setupUser(username: string, hash: string, userType: UserType) {
    mockObjects.fakeUser = {
      username,
      hash,
      userType,
    };

    td.when(mockFunctions.findUser(username)).thenResolve(mockObjects.fakeUser);
  }
});
