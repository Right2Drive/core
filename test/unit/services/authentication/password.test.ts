import { expect } from 'chai';

import { hashPassword, checkPassword } from '@/services/authentication/password';

describe('authentication service password module', function () {
  const simplePassword = 'simplepassword';
  const complexPassword = '_C0MP|3><?';

  describe('should hash', function () {

    it('simple password', function (done) {
      test(simplePassword, done);
    });

    it('complex password', function (done) {
      test(complexPassword, done);
    });

    function test(password: string, done: MochaDone) {
      hashPassword(password).then((hash) => {
        expect(hash).to.be.a('string');
        expect(hash).to.not.be.equal(password);
        expect(numSubstrings(hash, '$')).to.be.equal(3);
        done();
      });
    }
  });

  describe('should compare', function () {
    const simpleHash = '$2a$11$mkIzes44pQ96o/l/lEUhJewwAGhiQva3HC2lTelnx6NlcKP2LPnu2';
    const complexHash = '$2a$11$xNyDJJcxz5Xu.J3V6CRS6uxqbt1oTKp.sGeToI9WqwLluaAKIXnia';

    it('simple password', function (done) {
      test(simplePassword, simpleHash, done);
    });

    it('complex password', function (done) {
      test(complexPassword, complexHash, done);
    });

    function test(password: string, hash: string, done: MochaDone) {
      checkPassword(password, hash).then((isPassword) => {
        expect(isPassword).to.be.true;
        done();
      });
    }
  });
});

function numSubstrings(str: string, substr: string) {
  return str.split(substr).length - 1;
}
