import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * SearchPatientsForm -> all values
 */
const selectSearchPatientsFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'searchPatients.values', {})
);

/**
 * SearchPatientsForm -> checking validation error
 */
const selectSearchPatientsFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'searchPatients.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectSearchPatientsFormValues,
  selectSearchPatientsFormError,
};
