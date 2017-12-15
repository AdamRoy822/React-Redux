// import ProfilePage from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import { ReduxForm } from 'redux-form';
import React from 'react';

import { ProfilePage } from 'containers/ProfilePage';

describe('<ProfilePage /> component', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        changePasswordResult: {},
        changePassword: expect.createSpy(),
        changeImage: expect.createSpy(),
        currentUser: {},
      };

      const shallowWrapper = shallow(<ProfilePage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should render the change password form', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.contains(<ReduxForm />)).toEqual(true);
  });

  it('should pass correct props to the refer form', () => {
    const { shallowWrapper } = setup();

    const formProps = shallowWrapper.find('ReduxForm').props();
    expect(formProps).toContain({ changePasswordResult: {} });
    expect(formProps.changePassword).toBeA('function');
  });
});
