// import { selectResetPasswordPageDomain } from '../selectors';
import expect from 'expect';
import { selectResetPasswordPageDomain } from '../selectors';

// const selector = selectResetPasswordPageDomain();

describe('selectResetPasswordPageDomain', () => {
  describe('selectResetPasswordPageDomain', () => {
    const resetPasswordPageDomainSelector = selectResetPasswordPageDomain();
    it('should select reset password page state', () => {
      const referPageState = {};
      const mockedState = {
        resetPasswordPage: {},
      };
      expect(resetPasswordPageDomainSelector(mockedState)).toEqual(referPageState);
    });
  });
});
