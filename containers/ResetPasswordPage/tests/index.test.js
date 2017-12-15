// import ResetPasswordPage from '../index';

import expect from 'expect';
import { ResetPasswordPage } from 'containers/ResetPasswordPage';
import { ReduxForm } from 'redux-form';
import { shallow } from 'enzyme';
import React from 'react';
// import ResetPasswordForm from 'components/ResetPasswordForm';
// import { shallow } from 'enzyme';
// import React from 'react';

describe('<ResetPasswordPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        onSubmitForm: expect.createSpy(),
      };

      const shallowWrapper = shallow(<ResetPasswordPage {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('should render the reset password form', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.contains(<ReduxForm />)).toEqual(true);
  });

  it('should pass correct props to reset password form', () => {
    const { shallowWrapper } = setup();

    const formProps = shallowWrapper.find('ReduxForm').props();
    expect(formProps.onSubmit).toBeA('function');
  });
});
