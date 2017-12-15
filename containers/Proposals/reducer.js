/*
 *
 * Proposals reducer
 *
 */

import {
  DEFAULT_ACTION,
  PROPOSALS_RECEIVED,
} from './constants';

const initialState = false;

function proposalsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PROPOSALS_RECEIVED:
      return action.payload;
    default:
      return state;
  }
}

export default proposalsReducer;
