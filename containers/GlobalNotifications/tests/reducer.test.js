import expect from 'expect';
import globalNotificationsReducer from '../reducer';

describe('globalNotificationsReducer', () => {
  it('returns the initial state', () => {
    expect(globalNotificationsReducer(undefined, {})).toEqual({});
  });
});
