/*
 *
 * RequestProposalPage reducer
 *
 */

import {
  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,
  FETCH_PROPOSAL_SUCCESS,
} from 'containers/RequestProposalPage/constants';

const initialState = {
  coupon: {
    details: null,
    fetching: false,
    error: null,
  },
  proposalDetail: null,
};

function requestProposalPageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COUPON:
      return {
        ...state,
        coupon: {
          details: null,
          fetching: true,
          error: null,
        },
      };
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        coupon: {
          details: action.payload,
          fetching: false,
          error: null,
        },
      };
    case FETCH_COUPON_ERROR:
      return {
        ...state,
        coupon: {
          details: null,
          fetching: false,
          error: action.payload,
        },
      };
    case FETCH_PROPOSAL_SUCCESS:
      return {
        ...state,
        proposalDetail: action.payload,
      };
    default:
      return state;
  }
}

export default requestProposalPageReducer;
