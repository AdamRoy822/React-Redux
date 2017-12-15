/*
 *
 * MangeTransferNumberPage reducer
 *
 */

import {
  FETCH_SOURCES_SUCCESS,
} from './constants';

const initialState = {
  sources: [],
};

function mangeTransferNumberPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        sources: action.payload,
      };
    default:
      return state;
  }
}

export default mangeTransferNumberPageReducer;
