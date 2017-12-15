import { createSelector } from 'reselect';

/**
 * Direct selector to the RewardsPage state domain
 */
const selectRewardsPageDomain = () => state => state.rewardsPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by RewardsPage
 */

const selectRewardsPage = () => createSelector(
  selectRewardsPageDomain(),
  (substate) => substate
);

const selectSites = () => createSelector(
  selectRewardsPageDomain(),
  (substate) => substate.sites
);


export default selectRewardsPage;
export {
  selectRewardsPageDomain,
  selectSites,
};
