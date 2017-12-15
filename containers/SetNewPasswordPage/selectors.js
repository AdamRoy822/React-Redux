import { createSelector } from 'reselect';

/**
 * Direct selector to the setNewPasswordPage state domain
 */
const selectSetNewPasswordPageDomain = () => state => state.setNewPasswordPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SetNewPasswordPage
 */

const selectSetNewPasswordPage = () => createSelector(
  selectSetNewPasswordPageDomain(),
  (substate) => substate
);

export default selectSetNewPasswordPage;
export {
  selectSetNewPasswordPageDomain,
};
