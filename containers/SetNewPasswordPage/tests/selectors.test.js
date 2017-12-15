// import { selectSetNewPasswordPageDomain } from '../selectors';
import expect from 'expect';
import { selectSetNewPasswordPageDomain } from '../selectors';

describe('selectSetNewPasswordPageDomain', () => {
  describe('selectSetNewPasswordPageDomain', () => {
    const setNewPasswordPageDomainSelector = selectSetNewPasswordPageDomain();
    it('should select set new password page state', () => {
      const pageState = {};
      const mockedState = {
        setNewPasswordPage: {},
      };
      expect(setNewPasswordPageDomainSelector(mockedState)).toEqual(pageState);
    });
  });
});
