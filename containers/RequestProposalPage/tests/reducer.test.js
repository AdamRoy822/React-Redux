import expect from 'expect';
import requestProposalPageReducer from '../reducer';

describe('requestProposalPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      coupon: {
        details: null,
        fetching: false,
        error: null,
      },
    };
    expect(requestProposalPageReducer(undefined, {})).toEqual(initialState);
  });
});
