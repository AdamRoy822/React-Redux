import expect from 'expect';

import {
  changePassword,
  passwordChanged,
  passwordChangingError,
  changeImage,
  imageChanged,
  imageChangingError,
} from '../actions';

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_IMAGE,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
} from '../constants';

describe('ProfilePage actions', () => {
  describe('actions for change password on profile page', () => {
    describe('changePassword', () => {
      it('should return the correct type with form values', () => {
        const values = {
          old_password: 'test',
          new_password: 'test1',
          new_password_confirm: 'test1',
        };
        const expected = {
          type: CHANGE_PASSWORD,
          payload: values,
        };
        expect(changePassword(values)).toEqual(expected);
      });
    });

    describe('passwordChanged', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: CHANGE_PASSWORD_SUCCESS,
          payload: response,
        };
        expect(passwordChanged(response)).toEqual(expected);
      });
    });

    describe('passwordChangingError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: CHANGE_PASSWORD_ERROR,
          payload: error,
        };
        expect(passwordChangingError(error)).toEqual(expected);
      });
    });
  });

  describe('actions for change image on profile page', () => {
    describe('changeImage', () => {
      it('should return the correct type with form values', () => {
        const values = {
          old_password: 'test',
          new_password: 'test1',
          new_password_confirm: 'test1',
        };
        const expected = {
          type: CHANGE_IMAGE,
          payload: values,
        };
        expect(changeImage(values)).toEqual(expected);
      });
    });

    describe('imageChanged', () => {
      it('should return the correct type and the resopnse', () => {
        const response = {};
        const expected = {
          type: CHANGE_IMAGE_SUCCESS,
          payload: response,
        };
        expect(imageChanged(response)).toEqual(expected);
      });
    });

    describe('imageChangingError', () => {
      it('should return the correct type and the error', () => {
        const error = { status: '', message: '' };
        const expected = {
          type: CHANGE_IMAGE_ERROR,
          payload: error,
        };
        expect(imageChangingError(error)).toEqual(expected);
      });
    });
  });
});
