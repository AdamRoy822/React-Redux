import { createSelector } from 'reselect';

/**
 * Direct selector to the mangeTransferNumberPage state domain
 */
const selectMangeTransferNumberPageDomain = () => state => state.manageTransferNumberPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by MangeTransferNumberPage
 */

const selectMangeTransferNumberPage = () => createSelector(
  selectMangeTransferNumberPageDomain(),
  (substate) => substate
);

const selectSources = () => createSelector(
  selectMangeTransferNumberPageDomain(),
  (substate) => substate.sources
);

export default selectMangeTransferNumberPage;
export {
  selectMangeTransferNumberPageDomain,
  selectSources,
};
