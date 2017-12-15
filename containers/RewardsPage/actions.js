/*
 *
 * RewardsPage actions
 *
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  FETCH_SITES,
  FETCH_SITES_SUCCESS,
  FETCH_SITES_ERROR,
} from './constants';

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

export function fetchSites() {
  return {
    type: FETCH_SITES,
  };
}

export function sitesFetched(payload) {
  return {
    type: FETCH_SITES_SUCCESS,
    payload,
  };
}

export function sitesFetchingError(payload) {
  return {
    type: FETCH_SITES_ERROR,
    payload,
  };
}
