import { selectPaymentInformationPageDomain } from '../selectors';
import expect from 'expect';

// const selector = selectPaymentInformationPageDomain();

describe('selectPaymentInformationPageDomain', () => {
  const paymentInformationPageDomainSelector = selectPaymentInformationPageDomain();
  it('should select Payment Information page state', () => {
    const state = {};
    const mockedState = {
      paymentInformationPage: state,
    };
    expect(paymentInformationPageDomainSelector(mockedState)).toEqual(state);
  });
});
