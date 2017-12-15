import { selectMangeTransferNumberPageDomain } from '../selectors';
import expect from 'expect';

// const selector = selectMangeTransferNumberPageDomain();

describe('selectMangeTransferNumberPageDomain', () => {
  const manageTransferNumberPageSelector = selectMangeTransferNumberPageDomain();
  it('Expect to have unit tests specified', () => {
    const state = {};
    const mockedState = {
      manageTransferNumberPage: state,
    };
    expect(manageTransferNumberPageSelector(mockedState)).toEqual(state);
  });
});
