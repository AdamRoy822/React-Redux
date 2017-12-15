/**
 * Test  sagas
 */

import expect from 'expect';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
// import { defaultSaga } from '../sagas';

// const generator = defaultSaga();

import {
  changePassword,
  changeImage,
  profilePageSaga,
} from '../sagas';

import {
  passwordChanged,
  passwordChangingError,
} from 'containers/ProfilePage/actions';

import {
  CHANGE_PASSWORD,
} from 'containers/ProfilePage/constants';

import request from 'utils/request';

describe('defaultSaga Saga', () => {
  describe('changePassword Saga', () => {
    let iterator;
    let actualYield;
    let expectedYield;
    const values = {
      old_password: 'test',
      new_password: 'test1',
      new_password_confirm: 'test1',
    };

    beforeEach(() => {
      iterator = changePassword();

      actualYield = iterator.next().value;
      expect(actualYield).toEqual(take(CHANGE_PASSWORD));

      const requestURL = `${API_URL}/userPasswordChange/change-password`;
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
      // actualYield = iterator.next().value; // skip react-redux-toastr actions
      expect(actualYield).toEqual(put(passwordChanged(response)));
    });

    it('should call the formSubmissionError action if the response errors', () => {
      const error = { message: 'Something went wrong!' };
      actualYield = iterator.throw(error).value;
      actualYield = iterator.next().value; // skip react-redux-toastr actions
      expect(actualYield).toEqual(put(passwordChangingError(error)));
    });
  });

  describe('profilePageSaga', () => {
    const mainSaga = profilePageSaga();

    let forkDescriptorA;
    let forkDescriptorB;

    it('should asyncronously fork 2 watchers saga', () => {
      forkDescriptorA = mainSaga.next();
      expect(forkDescriptorA.value).toEqual(fork(changePassword));
      forkDescriptorB = mainSaga.next();
      expect(forkDescriptorB.value).toEqual(fork(changeImage));
    });

    it('should yield until LOCATION_CHANGE action', () => {
      const takeDescriptor = mainSaga.next();
      expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
    });

    it('should finally cancel() the forked submitFormWatcher saga',
      function* profileFormSagaCancellable() {
        // reuse open fork for more integrated approach
        let actualYield = mainSaga.next(put(LOCATION_CHANGE)).value;
        expect(actualYield).toEqual(cancel(forkDescriptorA));
        actualYield = mainSaga.next().value;
        expect(actualYield).toEqual(cancel(forkDescriptorB));
      }
    );
  });
});
