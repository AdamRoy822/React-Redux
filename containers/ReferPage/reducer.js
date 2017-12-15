/*
 *
 * ReferPage reducer
 *
 */

import { map } from 'lodash';

import {
  DEFAULT_COMPANY_TYPES,
  FETCH_COMPANY_TYPES_SUCCESS,
} from 'containers/ReferPage/constants';

const initialState = {
  companyTypes: DEFAULT_COMPANY_TYPES,
};

function referPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANY_TYPES_SUCCESS:
      return {
        ...state,
        companyTypes: map(action.payload, 'type'),
      };
    default:
      return state;
  }
}

export default referPageReducer;
