import expect from 'expect';
import {
  setNewPasswordRequest,
  setNewPasswordSuccess,
  setNewPasswordError,
} from '../actions';

import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
} from '../constants';

describe('SetNewPasswordPage actions', () => {
  describe('setNewPasswordRequest Action', () => {
    it('should return the correct type with form values', () => {
      const values = {
        password: '123',
      };

      const expected = {
        type: SET_NEW_PASSWORD_REQUEST,
        payload: values,
      };
      expect(setNewPasswordRequest(values)).toEqual(expected);
    });
  });

  describe('setNewPasswordSuccess Action', () => {
    it('should return the correct type and the response', () => {
      const response = {};
      const expected = {
        type: SET_NEW_PASSWORD_SUCCESS,
        payload: response,
      };
      expect(setNewPasswordSuccess(response)).toEqual(expected);
    });
  });

  describe('setNewPasswordError Action', () => {
    it('should return the correct type and the error', () => {
      const error = { status: '', message: '' };
      const expected = {
        type: SET_NEW_PASSWORD_ERROR,
        payload: error,
      };
      expect(setNewPasswordError(error)).toEqual(expected);
    });
  });
});
