import { ManageTransferNumberPage } from 'containers/ManageTransferNumberPage';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'store';
import { ReduxForm } from 'redux-form';

describe('<ManageTransferNumberPage />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        fetchSources: expect.createSpy(),
        sources: [],
        onSubmitForm: expect.createSpy(),
      };

      const shallowWrapper = shallow(<ManageTransferNumberPage {...props} />);

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

  it('should call fetchSources on load', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <ManageTransferNumberPage {...props} />
      </Provider>
    );

    expect(props.fetchSources).toHaveBeenCalled();
  });
});
