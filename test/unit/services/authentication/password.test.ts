import { expect } from 'chai';
import * as td from 'testdouble';
import * as bcrypt from 'bcrypt';

import { hashPassword, checkPassword, SALT_ROUNDS } from '@/services/authentication/password';
import { numSubstrings } from '@/utilities/functions/numSubstrings';

interface BcryptMock {
  hash: typeof bcrypt.hash;
  compare: typeof bcrypt.compare;
}

describe('authentication service password module', function () {
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';
  let bcryptMock: BcryptMock;

  it('should have >=10 salt rounds', function () {
    expect(SALT_ROUNDS).to.be.greaterThan(9);
  });

  describe('should hash', function () {

    describe('without bcrypt', function () {
      const fakeHash = '$2a$11$k8yDJJcxz5Xu.JnV6CRS6uxqbt1ogHp.sYeToI9WqwLluaAKIXnia';

      beforeEach(function () {
        mockBcrypt();
      });

      it('simple password', async function () {
        td.when(bcryptMock.hash(simplePassword, SALT_ROUNDS)).thenResolve(fakeHash);
        await test(simplePassword);
        td.verify(bcryptMock.hash(simplePassword, SALT_ROUNDS), { times: 1 });
      });

      it('complex password', async function () {
        td.when(bcryptMock.hash(complexPassword, SALT_ROUNDS)).thenResolve(fakeHash);
        await test(complexPassword);
        td.verify(bcryptMock.hash(complexPassword, SALT_ROUNDS), { times: 1 });
      });
    });

    it('simple password', async function () {
      return test(simplePassword);
    });

    it('complex password', async function () {
      return test(complexPassword);
    });

    async function test(password: string) {
      const hash = await hashPassword(password);
      expect(hash).to.be.a('string');
      expect(hash).to.not.be.equal(password);
      expect(numSubstrings(hash, '$')).to.be.equal(3);
    }
  });

  describe('should compare', function () {
    const simpleHash = '$2a$11$mkIzes44pQ96o/l/lEUhJewwAGhiQva3HC2lTelnx6NlcKP2LPnu2';
    const complexHash = '$2a$11$xNyDJJcxz5Xu.J3V6CRS6uxqbt1oTKp.sGeToI9WqwLluaAKIXnia';
    const incorrectHash = '$2a$11$yNyDJJcxz5Xu.JnV6CRS6uxqbt1oTKp.sgeToI9WqwLluaAKIXnia';

    describe('without bcrypt', function () {
      beforeEach(function () {
        mockBcrypt();
      });

      it('simple password', async function () {
        td.when(bcryptMock.compare(simplePassword, simpleHash)).thenResolve(true);
        const result = await test(simplePassword, simpleHash, true);
        td.verify(bcryptMock.compare(simplePassword, simpleHash), { times: 1 });
      });

      it('complex password', async function () {
        td.when(bcryptMock.compare(complexPassword, complexHash)).thenResolve(true);
        const result = await test(complexPassword, complexHash, true);
        td.verify(bcryptMock.compare(complexPassword, complexHash), { times: 1 });
      });
    });

    it('simple password', async function () {
      return test(simplePassword, simpleHash, true);
    });

    it('complex password', async function () {
      return test(complexPassword, complexHash, true);
    });

    it('incorrect password', async function () {
      return test(simplePassword, incorrectHash, false);
    });

    async function test(password: string, hash: string, expected: boolean) {
      const isPassword = await checkPassword(password, hash);
      expect(isPassword).to.be.eq(expected);
    }
  });

  function mockBcrypt() {
    bcryptMock = {
      compare: td.replace(bcrypt, 'compare'),
      hash: td.replace(bcrypt, 'hash'),
    };
  }
});
