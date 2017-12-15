import expect from 'expect';
import listNewStudyPageReducer from '../reducer';

describe('listNewStudyPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      showAddSiteLocationModal: false,
      showAddEmailModal: false,
    };
    expect(listNewStudyPageReducer(undefined, {})).toEqual(initialState);
  });
});
