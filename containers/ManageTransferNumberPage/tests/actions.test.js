import expect from 'expect';
import {
  fetchSources,
  fetchSourcesSuccess,
  fetchSourcesError,
} from '../actions';

import {
  FETCH_SOURCES,
  FETCH_SOURCES_SUCCESS,
  FETCH_SOURCES_ERROR,
} from '../constants';

describe('MangeTransferNumberPage actions', () => {
  describe('actions for fetch sources', () => {
    describe('fetchSources Action', () => {
      it('should return the correct type with form values', () => {
        const expected = {
          type: FETCH_SOURCES,
        };
        expect(fetchSources()).toEqual(expected);
      });
    });

    describe('fetchSourcesSuccess Action', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: FETCH_SOURCES_SUCCESS,
          payload: response,
        };
        expect(fetchSourcesSuccess(response)).toEqual(expected);
      });
    });

    describe('fetchSourcesError Action', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: FETCH_SOURCES_ERROR,
          payload: error,
        };
        expect(fetchSourcesError(error)).toEqual(expected);
      });
    });
  });
});
