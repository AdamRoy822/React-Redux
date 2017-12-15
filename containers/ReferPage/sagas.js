
// /* eslint-disable no-constant-condition, consistent-return */

import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { reset } from 'redux-form';
import { get } from 'lodash';

import request from 'utils/request';

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

// Bootstrap sagas
export default [
  referPageSaga,
];

// Does not allow concurrent fetches of company types (for demo purpose)
// Alternatively you may use takeEvery
export function* fetchCompanyTypesWatcher() {
  yield* takeLatest(FETCH_COMPANY_TYPES, fetchCompanyTypes);
}

export function* fetchCompanyTypes() {
  try {
    const requestURL = `${API_URL}/companyTypes`;
    const response = yield call(request, requestURL);

    yield put(companyTypesFetched(response));
  } catch (err) {
    yield put(companyTypesFetchingError(err));
  }
}

export function* submitFormWatcher() {
  while (true) {
    // listen for the SUBMIT_FORM action dispatched on form submit
    const { payload } = yield take(SUBMIT_FORM);

    try {
      const requestURL = `${API_URL}/referral`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(toastrActions.success('Refer', 'The request has been submitted successfully'));
      yield put(formSubmitted(response));

      // Clear the form values
      yield put(reset('refer'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong while submitting your request');
      yield put(toastrActions.error('', errorMessage));
      yield put(formSubmissionError(err));
    }
  }
}

export function* referPageSaga() {
  const watcherA = yield fork(fetchCompanyTypesWatcher);
  const watcherB = yield fork(submitFormWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}
