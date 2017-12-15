// import { selectProfilePageDomain } from '../selectors';
import expect from 'expect';
import { selectProfilePageDomain } from '../selectors';

describe('selectProfilePageDomain', () => {
  describe('selectProfilePageDomain', () => {
    const profilePageDomainSelector = selectProfilePageDomain();
    it('should select profile page state', () => {
      const profilePageState = {
        changePasswordResult: {
          success: '',
          info: '',
        },
      };
      const mockedState = {
        profilePage: profilePageState,
      };
      expect(profilePageDomainSelector(mockedState)).toEqual(profilePageState);
    });
  });
});
