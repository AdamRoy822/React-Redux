import { createSelector } from 'reselect';

/**
 * Direct selector to the proposals state domain
 */
const selectProposalsDomain = () => state => state.proposals;

/**
 * Other specific selectors
 */


/**
 * Default selector used by Proposals
 */

const selectProposals = () => createSelector(
  selectProposalsDomain(),
  (substate) => substate
);

export default selectProposals;
export {
  selectProposalsDomain,
  selectProposals,
};
