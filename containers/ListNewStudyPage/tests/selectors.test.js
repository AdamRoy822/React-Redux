// import { selectListNewStudyPageDomain } from '../selectors';
import expect from 'expect';
import { selectListNewStudyPageDomain } from '../selectors';

describe('selectListNewStudyPageDomain', () => {
  const listNewStudyPageSelector = selectListNewStudyPageDomain();
  it('should select ListNewStudyPage page state', () => {
    const state = {};
    const mockedState = {
      listNewStudyPage: state,
    };
    expect(listNewStudyPageSelector(mockedState)).toEqual(state);
  });
});
