import expect from 'expect';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError,
} from '../actions';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from '../constants';

describe('ResetPasswordPage actions', () => {
  describe('actions for reset password request', () => {
    describe('resetPasswordRequest Action', () => {
      it('should return the correct type with form values', () => {
        const values = {
          email: 'test@test.com',
        };

        const expected = {
          type: RESET_PASSWORD_REQUEST,
          payload: values,
        };
        expect(resetPasswordRequest(values)).toEqual(expected);
      });
    });

    describe('resetPasswordSuccess Action', () => {
      it('should return the correct type and the response', () => {
        const response = {};
        const expected = {
          type: RESET_PASSWORD_SUCCESS,
          payload: response,
        };
        expect(resetPasswordSuccess(response)).toEqual(expected);
      });
    });

    describe('formSubmissionError Action', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: RESET_PASSWORD_ERROR,
          payload: error,
        };
        expect(resetPasswordError(error)).toEqual(expected);
      });
    });
  });
});
