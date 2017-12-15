import expect from 'expect';

import { selectReferPageDomain, selectCompanyTypes } from '../selectors';
import { DEFAULT_COMPANY_TYPES } from '../constants';

describe('ReferPage/selectors', () => {
  describe('selectReferPageDomain', () => {
    const referPageDomainSelector = selectReferPageDomain();
    it('should select refer page state', () => {
      const referPageState = {
        companyTypes: [],
      };
      const mockedState = {
        referPage: referPageState,
      };
      expect(referPageDomainSelector(mockedState)).toEqual(referPageState);
    });
  });

  describe('selectCompanyTypes', () => {
    const companyTypesSelector = selectCompanyTypes();
    it('should select company types', () => {
      const mockedState = {
        referPage: {
          companyTypes: DEFAULT_COMPANY_TYPES,
        },
      };
      expect(companyTypesSelector(mockedState)).toEqual(DEFAULT_COMPANY_TYPES);
    });
  });
});
