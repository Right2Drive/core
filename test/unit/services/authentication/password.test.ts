import { expect } from 'chai';

import { hashPassword, checkPassword } from '@/services/authentication/password';
import { numSubstrings } from '@/utilities/functions/numSubstrings';

describe('authentication service password module', function () {
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';

  describe('should hash', function () {

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

    it('simple password', async function () {
      return test(simplePassword, simpleHash);
    });

    it('complex password', async function () {
      return test(complexPassword, complexHash);
    });

    async function test(password: string, hash: string) {
      const isPassword = await checkPassword(password, hash);
      expect(isPassword).to.be.true;
    }
  });
});
