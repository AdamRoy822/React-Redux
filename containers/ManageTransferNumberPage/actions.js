/*
 *
 * MangeTransferNumberPage actions
 *
 */

import {
  FETCH_SOURCES,
  FETCH_SOURCES_SUCCESS,
  FETCH_SOURCES_ERROR,

  SUBMIT_SOURCES_FORM,
  SUBMIT_SOURCES_FORM_SUCCESS,
  SUBMIT_SOURCES_FORM_ERROR,
} from './constants';

export function fetchSources() {
  return {
    type: FETCH_SOURCES,
  };
}

export function fetchSourcesSuccess(payload) {
  return {
    type: FETCH_SOURCES_SUCCESS,
    payload,
  };
}

export function fetchSourcesError(payload) {
  return {
    type: FETCH_SOURCES_ERROR,
    payload,
  };
}

export function submitSourceForm(payload) {
  return {
    type: SUBMIT_SOURCES_FORM,
    payload,
  };
}

export function sourceFormSubmitted(payload) {
  return {
    type: SUBMIT_SOURCES_FORM_SUCCESS,
    payload,
  };
}

export function sourceFormSubmissionError(payload) {
  return {
    type: SUBMIT_SOURCES_FORM_ERROR,
    payload,
  };
}
