import expect from 'expect';
import mangeTransferNumberPageReducer from '../reducer';

describe('mangeTransferNumberPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      sources: [],
    };
    expect(mangeTransferNumberPageReducer(undefined, {})).toEqual(initialState);
  });
});
