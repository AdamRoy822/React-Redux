/*
 *
 * ListNewStudyPage reducer
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
  FETCH_INDICATION_LEVEL_PRICE_SUCCESS,
  FETCH_INDICATION_LEVEL_PRICE,
  CLEAR_FORM_SUBMISSION_DATA,
} from './constants';

const initialState = {
  showAddSiteLocationModal: false,
  showAddEmailModal: false,
  showSubmitFormModal: false,
  indicationLevelPrice: null,
  formSubmissionStatus: {
    submitting: false,
    error: null,
    response: null,
  },
};

function listNewStudyPageReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_SITE_LOCATION_MODAL:
      return {
        ...state,
        showAddSiteLocationModal: true,
      };
    case HIDE_ADD_SITE_LOCATION_MODAL:
      return {
        ...state,
        showAddSiteLocationModal: false,
      };
    case SHOW_ADD_EMAIL_MODAL:
      return {
        ...state,
        showAddEmailModal: true,
      };
    case HIDE_ADD_EMAIL_MODAL:
      return {
        ...state,
        showAddEmailModal: false,
      };
    case SUBMIT_FORM:
      return {
        ...state,
        showSubmitFormModal: true,
        formSubmissionStatus: {
          submitting: true,
          error: null,
          response: null,
        },
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: null,
          response: action.payload,
        },
      };
    case SUBMIT_FORM_ERROR:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: action.payload,
          response: null,
        },
      };
    case HIDE_SUBMIT_FORM_MODAL:
      return {
        ...state,
        showSubmitFormModal: false,
      };
    case FETCH_INDICATION_LEVEL_PRICE_SUCCESS:
      return {
        ...state,
        indicationLevelPrice: action.payload.price,
      };
    case FETCH_INDICATION_LEVEL_PRICE:
      return {
        ...state,
        indicationLevelPrice: null,
      };
    case CLEAR_FORM_SUBMISSION_DATA:
      return {
        ...state,
        formSubmissionStatus: {
          submitting: false,
          error: null,
          response: null,
        },
      };
    default:
      return state;
  }
}

export default listNewStudyPageReducer;
