import { createSelector } from 'reselect';

/**
 * Direct selector to the requestProposalPage state domain
 */
const selectRequestProposalPageDomain = () => state => state.requestProposalPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by RequestProposalPage
 */

const selectRequestProposalPage = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate
);

const selectCoupon = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.coupon
);

const selectProposalDetail = () => createSelector(
  selectRequestProposalPageDomain(),
  (substate) => substate.proposalDetail,
);

export default selectRequestProposalPage;
export {
  selectRequestProposalPageDomain,
  selectCoupon,
  selectProposalDetail,
};
