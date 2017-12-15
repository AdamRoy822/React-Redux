import { createSelector } from 'reselect';
import { get } from 'lodash';

/**
 * Direct selector to the routing state domain
 */
const selectFormDomain = () => state => state.form;

/**
 * ShoppingCartForm -> all values
 */
const selectShoppingCartFormValues = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'shoppingCart.values', {})
);

/**
 * ShoppingCartForm -> checking validation error
 */
const selectShoppingCartFormError = () => createSelector(
  selectFormDomain(),
  (substate) => {
    const errors = get(substate, 'shoppingCart.syncErrors', {});
    return Object.keys(errors).length > 0;
  }
);

/**
 * ShoppingCartForm -> `couponId`
 */
const selectCouponId = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'shoppingCart.values.couponId')
);

/**
 * ShoppingCartForm -> `total`
 */
const selectTotal = () => createSelector(
  selectFormDomain(),
  (substate) => get(substate, 'shoppingCart.values.total')
);

export default selectFormDomain;
export {
  selectShoppingCartFormValues,
  selectShoppingCartFormError,
  selectCouponId,
  selectTotal,
};
