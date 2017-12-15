/*
 *
 * RewardsPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_SITES,
  FETCH_SITES_SUCCESS,
} from 'containers/RewardsPage/constants';

const initialState = {
  sites: DEFAULT_SITES,
};

function RewardsPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SITES_SUCCESS:
      return {
        ...state,
        sites: map(action.payload, 'type'),
      };
    default:
      return state;
  }
}

export default RewardsPageReducer;
