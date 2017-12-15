import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * EditSiteForm -> all values
 */
const selectEditSiteFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'editSite.values', {})
);

/**
 * EditSiteForm -> checking validation error
 */
const selectEditSiteFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'editSite.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectEditSiteFormValues,
  selectEditSiteFormError,
};
