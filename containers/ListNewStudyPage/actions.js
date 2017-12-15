/*
 *
 * ListNewStudyPage actions
 *
 */

import {
  SHOW_ADD_SITE_LOCATION_MODAL,
  HIDE_ADD_SITE_LOCATION_MODAL,
  SHOW_ADD_EMAIL_MODAL,
  HIDE_ADD_EMAIL_MODAL,
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  HIDE_SUBMIT_FORM_MODAL,
  FETCH_INDICATION_LEVEL_PRICE,
  FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
  FETCH_INDICATION_LEVEL_PRICE_ERROR,
  CLEAR_FORM_SUBMISSION_DATA,
} from './constants';

export function showSiteLocationModal() {
  return {
    type: SHOW_ADD_SITE_LOCATION_MODAL,
  };
}

export function hideSiteLocationModal() {
  return {
    type: HIDE_ADD_SITE_LOCATION_MODAL,
  };
}

export function showAddEmailModal() {
  return {
    type: SHOW_ADD_EMAIL_MODAL,
  };
}

export function hideAddEmailModal() {
  return {
    type: HIDE_ADD_EMAIL_MODAL,
  };
}

export function submitForm(cartValues, formValues) {
  return {
    type: SUBMIT_FORM,
    cartValues,
    formValues,
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

export function hideSubmitFormModal() {
  return {
    type: HIDE_SUBMIT_FORM_MODAL,
  };
}

export function fetchIndicationLevelPrice(indicationId, levelId) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE,
    indicationId,
    levelId,
  };
}

export function fetchIndicationLevelPriceSuccess(payload) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
    payload,
  };
}

export function fetchIndicationLevelPriceError(payload) {
  return {
    type: FETCH_INDICATION_LEVEL_PRICE_ERROR,
    payload,
  };
}

export function clearFormSubmissionData() {
  return {
    type: CLEAR_FORM_SUBMISSION_DATA,
  };
}

