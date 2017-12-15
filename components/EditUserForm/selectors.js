import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * EditUserForm -> all values
 */
const selectEditUserFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'editUser.values', {})
);

/**
 * EditUserForm -> checking validation error
 */
const selectEditUserFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'editUser.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

const selectEditUserFormSiteValue = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'editUser.values.site', null)
);

export default selectFormDomain;
export {
  selectEditUserFormValues,
  selectEditUserFormError,
  selectEditUserFormSiteValue,
};
