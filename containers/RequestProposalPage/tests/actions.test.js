import expect from 'expect';
import {
  submitForm,
} from '../actions';
import {
  SUBMIT_FORM,
} from '../constants';

describe('RequestProposalPage actions', () => {
  describe('submitForm', () => {
    it('should return the correct type with form values', () => {
      const data = {};
      const expected = {
        type: SUBMIT_FORM,
        payload: data,
      };
      expect(submitForm(data)).toEqual(expected);
    });
  });
});
