import { createSelector } from 'reselect';

/**
 * Direct selector to the paymentInformationPage state domain
 */
const selectPaymentInformationPageDomain = () => state => state.paymentInformationPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by PaymentInformationPage
 */

const selectPaymentInformationPage = () => createSelector(
  selectPaymentInformationPageDomain(),
  (substate) => substate
);

export default selectPaymentInformationPage;
export {
  selectPaymentInformationPageDomain,
};
