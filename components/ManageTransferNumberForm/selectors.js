import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

const selectMangeSourcesFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'manageTransferNumbers.values', {})
);

const selectMangeSourcesFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'manageTransferNumbers.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectMangeSourcesFormValues,
  selectMangeSourcesFormError,
};
