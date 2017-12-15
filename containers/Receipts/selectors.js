import { createSelector } from 'reselect';

/**
 * Direct selector to the receipts state domain
 */
const selectReceiptsDomain = () => state => state.receipts;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Receipts
 */

const selectReceipts = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate
);

const selectReceiptsList = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate.receiptsList
);

const selectPaginationOptions = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate.paginationOptions
);

const selectSearchOptions = () => createSelector(
  selectReceiptsDomain(),
  (substate) => substate.searchOptions
);


export default selectReceipts;
export {
  selectReceiptsDomain,
  selectReceiptsList,
  selectPaginationOptions,
  selectSearchOptions,
};
