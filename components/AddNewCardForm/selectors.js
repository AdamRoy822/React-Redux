import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * AddNewCardForm -> all values
 */
const selectAddNewCardFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'addNewCard.values', {})
);

/**
 * AddNewCardForm -> checking validation error
 */
const selectAddNewCardFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'addNewCard.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

export default selectFormDomain;
export {
  selectAddNewCardFormValues,
  selectAddNewCardFormError,
};
