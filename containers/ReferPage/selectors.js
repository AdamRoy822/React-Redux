import { createSelector } from 'reselect';
import { map } from 'lodash';
/**
 * Direct selector to the referPage state domain
 */
const selectReferPageDomain = () => state => state.referPage;

/**
 * Other specific selectors
 */


/**
 * Default selector used by ReferPage
 */

const selectReferPage = () => createSelector(
  selectReferPageDomain(),
  (substate) => substate
);

const selectCompanyTypes = () => createSelector(
  selectReferPageDomain(),
  (substate) => {
    const companyTypes = substate.companyTypes;
    return map(companyTypes, e => (
      {
        id: `${e}`,
        label: `${e}`,
        type: e,
      }
    ));
  }
);


export default selectReferPage;
export {
  selectReferPageDomain,
  selectCompanyTypes,
};
