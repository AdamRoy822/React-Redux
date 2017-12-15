// /* eslint-disable no-constant-condition, consistent-return */

import { take, put, fork, cancel, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import { get } from 'lodash';

import request from 'utils/request';

import {
  passwordChanged,
  passwordChangingError,
  imageChanged,
  imageChangingError,
  fetchOtherUserSuccess,
  fetchOtherUserError,
} from 'containers/ProfilePage/actions';
import {
  CHANGE_PASSWORD,
  CHANGE_IMAGE,
  FETCH_OTHER_USER_REQUEST,
} from 'containers/ProfilePage/constants';

// Bootstrap sagas
export default [
  profilePageSaga,
];

export function* changePassword() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD);

    try {
      const requestURL = `${API_URL}/userPasswordChange/change-password`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(passwordChanged(response));
      yield put(toastrActions.success('', 'Success! Check your email to confirm password change.'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(passwordChangingError(err));
    }
  }
}

export function* changeImage() {
  while (true) {
    const { payload } = yield take(CHANGE_IMAGE);

    try {
      const requestURL = `${API_URL}/users/change-profile-image`;
      const data = new FormData();
      data.append('file', payload.file);
      data.append('user_id', payload.user_id);

      const params = {
        method: 'POST',
        body: data,
        useDefaultContentType: true,
      };
      const response = yield call(request, requestURL, params);
      yield put(imageChanged(response));
      yield put(toastrActions.success('', 'Success! Image uploaded.'));
    } catch (err) {
      yield put(imageChangingError(err));
      yield put(toastrActions.error('Error!'));
    }
  }
}

export function* fetchOtherUserWorker() {
  while (true) {
    const { payload } = yield take(FETCH_OTHER_USER_REQUEST);
    try {
      const requestURL = `${API_URL}/users/${payload.userId}`;
      const response = yield call(request, requestURL);

      yield put(fetchOtherUserSuccess(response));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(fetchOtherUserError(err));
    }
  }
}

export function* profilePageSaga() {
  const watcherA = yield fork(changePassword);
  const watcherB = yield fork(changeImage);
  const watcherC = yield fork(fetchOtherUserWorker);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
}
