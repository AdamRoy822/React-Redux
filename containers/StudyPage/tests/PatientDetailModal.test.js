import { PatientDetailModal } from 'containers/StudyPage/PatientDetail/PatientDetailModal';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'store';

import chaiEnzyme from 'chai-enzyme';
import expect from 'expect';
import chai from 'chai';
chai.use(chaiEnzyme());
const chaiExpect = chai.expect;

describe('<PatientDetailModal />', () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const props = {
        carousel: {
          email: false,
          note: true,
          other: false,
          text: false,
        },
        currentPatientCategory: {
          id: 1,
          name: 'New Patient',
          patients: [
            {
              email: 'gordon@gotham.com',
              firstName: 'James',
              id: 2,
              lastName: 'Gordon',
              lastTextMessage: Object,
              phone: '+15248888888',
              textMessageCount: 2,
            },
            {
              email: 'queen@arrow.com',
              firstName: 'Oliver',
              id: 1,
              lastName: 'Queen',
              lastTextMessage: Object,
              phone: '+15103808089',
              textMessageCount: 42,
            },
          ],
        },
        currentPatient: {
          age: 29,
          bmi: 18,
          createdAt: '2016-11-09T06:51:48.282Z',
          dob: null,
          email: 'queen@arrow.com',
          firstName: 'Oliver',
          gender: 'Male',
          id: 1,
          indications: [],
          lastAction: null,
          lastName: 'Queen',
          lastTextMessage: {},
          notes: [],
          phone: '+15103808089',
          source: {},
          source_id: 1,
          study_patient_category_id: 1,
          textMessageCount: 42,
          textMessages: [],
          unsubscribed: false,
          updatedAt: '2016-11-09T06:51:48.282Z',
        },
        currentUser: { id: 4, username: 'raypalmer' },
        openPatientModal: true,
        onClose: expect.createSpy(),
        studyId: 1,
        socket: {},
        switchToNoteSection: expect.createSpy(),
        switchToTextSection: expect.createSpy(),
        switchToEmailSection: expect.createSpy(),
        switchToOtherSection: expect.createSpy(),
        readStudyPatientMessages: expect.createSpy(),
        markAsReadPatientMessages: expect.createSpy(),
      };

      const shallowWrapper = shallow(<PatientDetailModal {...props} />);

      return {
        props,
        shallowWrapper,
      };
    };
  });

  it('Chat window should render.', () => {
    const { shallowWrapper } = setup();
    chaiExpect(shallowWrapper.find('.patients-list-form')).to.have.length(1);
  });

  it('Chat window pops up when text button is clicked for patient.', () => {
    const { props } = setup();
    const mountWrapper = mount( // eslint-disable-line
      <Provider store={configureStore({})}>
        <PatientDetailModal {...props} />
      </Provider>
    );

    mountWrapper.find('li.text').simulate('click');
    expect(props.switchToTextSection).toHaveBeenCalled();
  });
});
