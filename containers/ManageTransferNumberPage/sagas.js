import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import _, { get } from 'lodash';

import request from 'utils/request';

import {
  fetchSourcesSuccess,
  fetchSourcesError,
  sourceFormSubmitted,
  sourceFormSubmissionError,
} from 'containers/ManageTransferNumberPage/actions';

import {
  FETCH_SOURCES,
  SUBMIT_SOURCES_FORM,
} from 'containers/ManageTransferNumberPage/constants';

export function* fetchSourcesWatcher() {
  while (true) {
    yield take(FETCH_SOURCES);

    try {
      const requestURL = `${API_URL}/sources/getDetailedSources`;
      const response = yield call(request, requestURL);

      yield put(fetchSourcesSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Can not get sources list.');
      yield put(toastrActions.error('', errorMessage));
      yield put(fetchSourcesError(err));
    }
  }
}

export function* submitSourcesWatcher() {
  while (true) {
    const { payload } = yield take(SUBMIT_SOURCES_FORM);
    const sourcesToUpdate = [];
    _.forEach(payload.initialSources, (value, index) => {
      if (payload.sourcesList[index].twilioRedirectNumber) {
        if ((!value.twilioRedirectNumber && payload.sourcesList[index].twilioRedirectNumber.phoneNumber) ||
             (value.twilioRedirectNumber.phoneNumber !== payload.sourcesList[index].twilioRedirectNumber.phoneNumber)) {
          sourcesToUpdate.push(payload.sourcesList[index]);
        }
      }
    });

    try {
      const requestURL = `${API_URL}/sources/updateRedirectNumbers`;
      const params = {
        method: 'POST',
        body: JSON.stringify(sourcesToUpdate),
      };
      const response = yield call(request, requestURL, params);
      yield put(toastrActions.success('Manage Souces', 'Updated.'));
      yield put(sourceFormSubmitted(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Can not update sources.');
      yield put(toastrActions.error('', errorMessage));
      yield put(sourceFormSubmissionError(err));
    }
  }
}


export function* manageTransferNumberPageSaga() {
  const watcherA = yield fork(fetchSourcesWatcher);
  const watcherB = yield fork(submitSourcesWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

// All sagas to be loaded
export default [
  manageTransferNumberPageSaga,
];
