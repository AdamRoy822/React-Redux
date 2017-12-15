import { createSelector } from 'reselect';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = () => state => state.profilePage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilePage
 */

const selectProfilePage = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate
);

const selectChangePasswordResult = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.changePasswordResult
);

const selectOtherUser = () => createSelector(
  selectProfilePageDomain(),
  (substate) => substate.otherUser
);

export default selectProfilePage;
export {
  selectProfilePageDomain,
  selectChangePasswordResult,
  selectProfilePage,
  selectOtherUser,
};
