/**
 * Test  sagas
 */

import expect from 'expect';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  submitFormWatcher,
  fetchCompanyTypesWatcher,
  fetchCompanyTypes,
  referPageSaga,
} from '../sagas';

import {
  formSubmitted,
  formSubmissionError,
  companyTypesFetched,
  companyTypesFetchingError,
} from 'containers/ReferPage/actions';

import {
  SUBMIT_FORM,
  FETCH_COMPANY_TYPES,
} from 'containers/ReferPage/constants';

import request from 'utils/request';

describe('ReferPage/sagas', () => {
  describe('fetchCompanyTypesWatcher Saga', () => {
    const iterator = fetchCompanyTypesWatcher();
    let actualYield;
    let expectedYield;

    it('should watch for FETCH_COMPANY_TYPES action', () => {
      actualYield = iterator.next().value;
      expectedYield = take(FETCH_COMPANY_TYPES);
      expect(actualYield).toEqual(expectedYield);
    });

    it('should invoke fetchCompanyTypes saga on actions', () => {
      // @ref http://yelouafi.github.io/redux-saga/docs/advanced/Concurrency.html
      actualYield = iterator.next(put(FETCH_COMPANY_TYPES)).value;
      expectedYield = fork(fetchCompanyTypes, put(FETCH_COMPANY_TYPES));
      expect(actualYield).toEqual(expectedYield);

      // @ref https://jsfiddle.net/npbee/Lqreq12b/2/
      // actualYield = iterator.next().value;
      // expectedYield = take(FETCH_COMPANY_TYPES);
      // expect(actualYield).toEqual(expectedYield);
    });
  });

  describe('fetchCompanyTypes Saga', () => {
    let iterator;

    beforeEach(() => {
      iterator = fetchCompanyTypes();

      const requestURL = `${API_URL}/companyTypes`;
      const actualYield = iterator.next().value;
      expect(actualYield).toEqual(call(request, requestURL));
    });

    it('should dispatch the companyTypesFetched action if it gets successful response', () => {
      const response = [
        { id: 1, type: 'Site' },
        { id: 1, type: 'Sponsor' },
        { id: 1, type: 'CRO' },
      ];
      const actualYield = iterator.next(response).value;
      expect(actualYield).toEqual(put(companyTypesFetched(response)));
    });

    it('should call the companyTypesFetchingError action if the response errors', () => {
      const error = { message: 'Something went wrong!' };
      const actualYield = iterator.throw(error).value;
      expect(actualYield).toEqual(put(companyTypesFetchingError(error)));
    });
  });

  describe('submitFormWatcher Saga', () => {
    let iterator;
    let actualYield;
    let expectedYield;
    const values = {
      email: 'test.user@example.com',
      name: 'Test User',
    };

    beforeEach(() => {
      iterator = submitFormWatcher();

      actualYield = iterator.next().value;
      expect(actualYield).toEqual(take(SUBMIT_FORM));

      const requestURL = `${API_URL}/referral`;
      const params = {
        method: 'POST',
        body: JSON.stringify(values),
      };
      actualYield = iterator.next({ payload: values }).value; // optionally passing a value
      expectedYield = call(request, requestURL, params);
      expect(actualYield).toEqual(expectedYield);
    });

    it('should dispatch the formSubmitted action if it gets successful response', () => {
      const response = values;
      actualYield = iterator.next(response).value;
      actualYield = iterator.next().value; // skip react-redux-toastr actions
      expect(actualYield).toEqual(put(formSubmitted(response)));
    });

    it('should call the formSubmissionError action if the response errors', () => {
      const error = { message: 'Something went wrong!' };
      actualYield = iterator.throw(error).value;
      actualYield = iterator.next().value; // skip react-redux-toastr actions
      expect(actualYield).toEqual(put(formSubmissionError(error)));
    });
  });

  describe('referPageSaga', () => {
    const mainSaga = referPageSaga();

    let forkDescriptorA;
    let forkDescriptorB;

    it('should asyncronously fork 2 watchers saga', () => {
      forkDescriptorA = mainSaga.next();
      expect(forkDescriptorA.value).toEqual(fork(fetchCompanyTypesWatcher));
      forkDescriptorB = mainSaga.next();
      expect(forkDescriptorB.value).toEqual(fork(submitFormWatcher));
    });

    it('should yield until LOCATION_CHANGE action', () => {
      const takeDescriptor = mainSaga.next();
      expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
    });

    it('should finally cancel() the forked submitFormWatcher saga',
      function* referFormSagaCancellable() {
        // reuse open fork for more integrated approach
        let actualYield = mainSaga.next(put(LOCATION_CHANGE)).value;
        expect(actualYield).toEqual(cancel(forkDescriptorA));
        actualYield = mainSaga.next().value;
        expect(actualYield).toEqual(cancel(forkDescriptorB));
      }
    );
  });
});
