/*
 *
 * RequestProposalPage actions
 *
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,

  FETCH_COUPON,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_ERROR,

  FETCH_PROPOSAL,
  FETCH_PROPOSAL_SUCCESS,
  FETCH_PROPOSAL_ERROR,
} from 'containers/RequestProposalPage/constants';

export function submitForm(payload) {
  return {
    type: SUBMIT_FORM,
    payload,
  };
}

export function formSubmitted(payload) {
  return {
    type: SUBMIT_FORM_SUCCESS,
    payload,
  };
}

export function formSubmissionError(payload) {
  return {
    type: SUBMIT_FORM_ERROR,
    payload,
  };
}


export function fetchCoupon(couponId) {
  return {
    type: FETCH_COUPON,
    couponId,
  };
}

export function couponFetched(payload) {
  return {
    type: FETCH_COUPON_SUCCESS,
    payload,
  };
}

export function couponFetchingError(payload) {
  return {
    type: FETCH_COUPON_ERROR,
    payload,
  };
}

export function fetchProposal(id) {
  return {
    type: FETCH_PROPOSAL,
    id,
  };
}

export function fetchProposalSuccess(payload) {
  return {
    type: FETCH_PROPOSAL_SUCCESS,
    payload,
  };
}

export function fetchProposalError(payload) {
  return {
    type: FETCH_PROPOSAL_ERROR,
    payload,
  };
}
