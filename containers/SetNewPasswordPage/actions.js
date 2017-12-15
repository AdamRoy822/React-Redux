/*
 *
 * SetNewPasswordPage actions
 *
 */

import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
} from './constants';

export function setNewPasswordRequest(payload) {
  return {
    type: SET_NEW_PASSWORD_REQUEST,
    payload,
  };
}

export function setNewPasswordSuccess(payload) {
  return {
    type: SET_NEW_PASSWORD_SUCCESS,
    payload,
  };
}

export function setNewPasswordError(payload) {
  return {
    type: SET_NEW_PASSWORD_ERROR,
    payload,
  };
}
