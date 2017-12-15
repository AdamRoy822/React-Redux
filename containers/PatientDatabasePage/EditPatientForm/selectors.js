import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * EditPatientForm -> all values
 */
const selectEditPatientFormValues = () => createSelector(
  selectFormDomain(),
  substate => get(substate, 'editPatient.values', {})
);

/**
 * EditPatientForm -> checking validation error
 */
const selectEditPatientFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'editPatient.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectEditPatientFormValues,
  selectEditPatientFormError,
};
