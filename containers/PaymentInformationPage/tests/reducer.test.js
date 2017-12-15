import expect from 'expect';
import paymentInformationPageReducer from '../reducer';

describe('paymentInformationPageReducer', () => {
  it('returns the initial state', () => {
    expect(paymentInformationPageReducer(undefined, {})).toEqual({});
  });
});
