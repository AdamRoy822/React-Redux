/*
 *
 * ReferPage actions
 *
 */

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  FETCH_COMPANY_TYPES,
  FETCH_COMPANY_TYPES_SUCCESS,
  FETCH_COMPANY_TYPES_ERROR,
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

export function fetchCompanyTypes() {
  return {
    type: FETCH_COMPANY_TYPES,
  };
}

export function companyTypesFetched(payload) {
  return {
    type: FETCH_COMPANY_TYPES_SUCCESS,
    payload,
  };
}

export function companyTypesFetchingError(payload) {
  return {
    type: FETCH_COMPANY_TYPES_ERROR,
    payload,
  };
}
