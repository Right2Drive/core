import { expect } from 'chai';
import { verify } from 'jsonwebtoken';

import { createToken } from '@/services/authentication/token';
import { UserType } from '@/models/User/UserType';
import { numSubstrings } from '@/utilities/functions/numSubstrings';

describe('authentication service token module', function () {
  const validUserType = UserType.BASIC;
  const validUsername = 'username';
  let circleObject: any;

  before(function () {
    circleObject = {};
    circleObject.circleObject = circleObject;
  });

  describe('should generate token', function () {

    it('that is encrypted', async function () {
      const token = await createToken(validUsername, validUserType);
      expect(token).to.be.a('string');
      expect(numSubstrings(token, '.')).to.be.eq(2);
    });

    it('that has user payload', async function () {
      const token = await createToken(validUsername, validUserType);
      return new Promise((resolve, reject) => {
        verify(token, process.env.JWT_SECRET, {}, (err, payload) => {
          err && reject(err);

          expect((payload as any).username).to.be.eq(validUsername);
          expect((payload as any).type).to.be.eq(validUserType);
          resolve();
        });
      });
    });
  });

  describe('should fail to generate token', function () {
    const emptyUsername = '';
    const invalidUsername = undefined as string;
    const invalidUserType = undefined as UserType;

    it('when empty username is provided', async function () {
      return test(emptyUsername, validUserType);
    });

    it('when no username is provided', async function () {
      return test(invalidUsername, validUserType);
    });

    it('when no type is provided', async function () {
      return test(validUsername, invalidUserType);
    });

    it('when argument cannot be serialized', async function () {
      return test(circleObject, validUserType);
    });

    async function test(username: string, type: UserType) {
      try {
        const token = await createToken(username, type);
      } catch (err) {
        return;
      }
      throw new Error('Should have failed to create token');
    }
  });
});
