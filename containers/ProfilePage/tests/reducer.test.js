import expect from 'expect';
import profilePageReducer from '../reducer';

import { passwordChanged } from '../actions';

describe('profilePageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      changePasswordResult: {
        success: '',
        info: '',
        passwordChanging: false,
      },
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(profilePageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the change password action correctly', () => {
    const response = '';
    const expectedResult = {
      ...state,
      changePasswordResult: {
        ...state.changePasswordResult,
        success: true,
        passwordChanging: false,
      },
    };
    expect(profilePageReducer(state, passwordChanged(response))).toEqual(expectedResult);
  });
});
