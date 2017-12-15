import expect from 'expect';

import {
  submitForm,
  formSubmitted,
  formSubmissionError,
  fetchCompanyTypes,
  companyTypesFetched,
  companyTypesFetchingError,
} from '../actions';

import {
  SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR,
  FETCH_COMPANY_TYPES,
  FETCH_COMPANY_TYPES_SUCCESS,
  FETCH_COMPANY_TYPES_ERROR,
} from '../constants';

describe('ReferPage/actions', () => {
  describe('actions for refer form submission', () => {
    describe('submitForm', () => {
      it('should return the correct type with form values', () => {
        const values = {
          email: 'test.user@example.com',
          name: 'Test User',
        };
        const expected = {
          type: SUBMIT_FORM,
          payload: values,
        };
        expect(submitForm(values)).toEqual(expected);
      });
    });

    describe('formSubmitted', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: SUBMIT_FORM_SUCCESS,
          payload: response,
        };
        expect(formSubmitted(response)).toEqual(expected);
      });
    });

    describe('formSubmissionError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: SUBMIT_FORM_ERROR,
          payload: error,
        };
        expect(formSubmissionError(error)).toEqual(expected);
      });
    });
  });

  describe('actions for fetching company types', () => {
    describe('fetchCompanyTypes', () => {
      it('should return the correct type', () => {
        const expected = {
          type: FETCH_COMPANY_TYPES,
        };
        expect(fetchCompanyTypes()).toEqual(expected);
      });
    });

    describe('companyTypesFetched', () => {
      it('should return the correct type and the passed types', () => {
        const response = [
          { id: 1, type: 'Site' },
          { id: 1, type: 'Sponsor' },
          { id: 1, type: 'CRO' },
        ];
        const expected = {
          type: FETCH_COMPANY_TYPES_SUCCESS,
          payload: response,
        };
        expect(companyTypesFetched(response)).toEqual(expected);
      });
    });

    describe('companyTypesFetchingError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: FETCH_COMPANY_TYPES_ERROR,
          payload: error,
        };
        expect(companyTypesFetchingError(error)).toEqual(expected);
      });
    });
  });
});
