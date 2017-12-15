import expect from 'expect';

import { selectRequestProposalPageDomain } from '../selectors';

describe('selectRequestProposalPageDomain', () => {
  const requestProposalPageDomainSelector = selectRequestProposalPageDomain();
  it('should select requestProposalPage state', () => {
    const state = {
    };
    const mockedState = {
      requestProposalPage: state,
    };
    expect(requestProposalPageDomainSelector(mockedState)).toEqual(state);
  });
});
