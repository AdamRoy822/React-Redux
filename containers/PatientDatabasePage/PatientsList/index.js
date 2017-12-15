import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _, { map, omit } from 'lodash';
import moment from 'moment-timezone';

import Checkbox from '../../../components/Input/Checkbox';
import CenteredModal from '../../../components/CenteredModal/index';
import EditPatientForm from '../../../containers/PatientDatabasePage/EditPatientForm';
import ChatForm from '../../../components/ChatForm';
import { selectPatients,
  selectSelectedPatient,
  selectSelectedPatientDetailsForForm,
  selectSavedPatient,
  selectChat } from '../../../containers/PatientDatabasePage/selectors';
import {
  sendStudyPatientMessages,
} from '../../../containers/GlobalNotifications/actions';
import { clearSelectedPatient,
  savePatient,
  initChat,
  disableChat,
  addPatientsToTextBlast,
  removePatientsFromTextBlast,
  setActiveSort,
  sortPatientsSuccess } from '../actions';
import PatientItem from './PatientItem';
import { normalizePhone, normalizePhoneDisplay } from '../../StudyPage/helper/functions';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';
import './styles.less';

const formName = 'PatientDatabase.TextBlastModal';

@reduxForm({ form: formName })
class PatientsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addPatientsToTextBlast: PropTypes.func,
    change: PropTypes.func,
    removePatientsFromTextBlast: PropTypes.func,
    patients: PropTypes.object,
    selectedPatient: PropTypes.object,
    selectedPatientDetailsForForm: PropTypes.object,
    savedPatient: PropTypes.object,
    chat: PropTypes.object,
    clearSelectedPatient: PropTypes.func,
    savePatient: PropTypes.func,
    initChat: PropTypes.func,
    disableChat: PropTypes.func,
    sendStudyPatientMessages: PropTypes.func,
    paginationOptions: PropTypes.object,
    searchPatients: PropTypes.func,
    setActiveSort: PropTypes.func,
    sortPatientsSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditPatientModal = this.closeEditPatientModal.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.toggleAllPatientSelection = this.toggleAllPatientSelection.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedPatient.saving && this.props.savedPatient.saving) {
      this.closeEditPatientModal();
    }
  }

  editPatientModalShouldBeShown() {
    const { selectedPatient } = this.props;
    const displayed = (selectedPatient.details) ? true: false; // eslint-disable-line

    return displayed;
  }

  closeEditPatientModal() {
    this.props.clearSelectedPatient();
  }

  updatePatient(patientData) {
    const { selectedPatient } = this.props;
    const payload = omit(patientData, ['indications', 'status', 'source']);
    payload.indications = map(patientData.indications, indicationIterator => indicationIterator.id);
    payload.source_id = patientData.source;
    payload.patient_category_id = patientData.status;
    payload.phone = normalizePhone(patientData.phone);

    this.props.savePatient(selectedPatient.details.id, payload);
  }

  chatModalShouldBeShown() {
    return this.props.chat.active;
  }

  openChat(payload) {
    this.props.initChat(payload);
  }

  closeChat() {
    this.props.disableChat();
  }

  toggleAllPatientSelection(checked) {
    const { addPatientsToTextBlast, change, patients, removePatientsFromTextBlast } = this.props;
    if (checked) {
      addPatientsToTextBlast(patients.details);
    } else {
      removePatientsFromTextBlast(patients.details);
    }
    for (const patient of patients.details) {
      change(`patient-${patient.id}`, checked);
    }
  }

  loadItems() {
    this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, false);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    if (sort !== 'orderNumber') {
      this.props.searchPatients({ ...this.props.paginationOptions.prevSearchFilter, sort, direction }, true);
    } else {
      const dir = ((direction === 'down') ? 'desc' : 'asc');
      const sortedPatients = _.orderBy(this.props.patients.details, [function (o) {
        return o.orderNumber;
      }], [dir]);
      this.props.sortPatientsSuccess(sortedPatients);
    }
  }

  render() {
    const { patients, selectedPatientDetailsForForm } = this.props;
    const chat = this.props.chat.active ? this.props.chat.details : null;
    const patientsListContents = patients.details.map((item, index) => {
      const patient = item;
      patient.phone = normalizePhoneDisplay(patient.phone);
      return (
        <PatientItem {...patient} key={index} index={index} openChat={this.openChat} />
      );
    });
    const editPatientModalShown = this.editPatientModalShouldBeShown();
    const chatModalShown = this.chatModalShouldBeShown();
    if (selectedPatientDetailsForForm) {
      selectedPatientDetailsForForm.phone = normalizePhoneDisplay(selectedPatientDetailsForForm.phone);
      if (selectedPatientDetailsForForm.dob) {
        const dob = moment(selectedPatientDetailsForForm.dob);
        selectedPatientDetailsForForm.dobMonth = dob.month();
        selectedPatientDetailsForForm.dobDay = dob.day();
        selectedPatientDetailsForForm.dobYear = dob.year();
      }
    }
    return (
      <div className="patient-database-fixed-table-wrapper">
        <StickyContainer className="table-holder fixed-table">
          <Sticky className="fixed-table-sticky-header">
            <header className="fixed-table-head">
              <h2>TOTAL PATIENT COUNT: {patients.details.length}</h2>
            </header>
            <div className="fixed-table-thead">
              <div className="table">
                <div className="thead">
                  <div className="tr">
                    <div className="th">
                      <Field
                        name="all-patients"
                        type="checkbox"
                        component={Checkbox}
                        onChange={this.toggleAllPatientSelection}
                      />
                    </div>
                    <div onClick={this.sortBy} data-sort="orderNumber" className={`th ${(this.props.paginationOptions.activeSort === 'orderNumber') ? this.props.paginationOptions.activeDirection : ''}`}>#<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="firstName" className={`th ${(this.props.paginationOptions.activeSort === 'firstName') ? this.props.paginationOptions.activeDirection : ''}`}>NAME<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="phone" className={`th ${(this.props.paginationOptions.activeSort === 'phone') ? this.props.paginationOptions.activeDirection : ''}`}>PHONE<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="indication" className={`th ${(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}`}>INDICATIONS<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="age" className={`th ${(this.props.paginationOptions.activeSort === 'age') ? this.props.paginationOptions.activeDirection : ''}`}>AGE<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="gender" className={`th ${(this.props.paginationOptions.activeSort === 'gender') ? this.props.paginationOptions.activeDirection : ''}`}>GENDER<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="bmi" className={`th ${(this.props.paginationOptions.activeSort === 'bmi') ? this.props.paginationOptions.activeDirection : ''}`}>BMI<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="status" className={`th ${(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}`}>STATUS<i className="caret-arrow" /></div>
                    <div onClick={this.sortBy} data-sort="source" className={`th ${(this.props.paginationOptions.activeSort === 'source') ? this.props.paginationOptions.activeDirection : ''}`}>SOURCE<i className="caret-arrow" /></div>
                  </div>
                </div>
              </div>
            </div>
          </Sticky>

          {(() => {
            if (patients.details.length > 0) {
              return (
                <div className="table">
                  <InfiniteScroll
                    className="tbody"
                    pageStart={0}
                    loadMore={this.loadItems}
                    initialLoad={false}
                    hasMore={this.props.paginationOptions.hasMoreItems}
                    loader={<div>Loading...</div>}
                  >
                    {patientsListContents}
                  </InfiniteScroll>
                </div>
              );
            }
            return false;
          })()}


        </StickyContainer>

        <div className="patients">
          <Modal className="edit-patient" dialogComponentClass={CenteredModal} show={editPatientModalShown} onHide={this.closeEditPatientModal}>
            <Modal.Header>
              <Modal.Title>
                <strong>Information</strong>
              </Modal.Title>
              <a className="close" onClick={this.closeEditPatientModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <EditPatientForm
                initialValues={selectedPatientDetailsForForm}
                onSubmit={this.updatePatient}
              />
            </Modal.Body>
          </Modal>
          {(chat)
            ?
            <Modal className="chat-patient" dialogComponentClass={CenteredModal} show={chatModalShown} onHide={this.closeChat}>
              <Modal.Header closeButton>
                <Modal.Title>Chat with {chat.firstName || ''} {chat.lastName || ''}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChatForm chat={chat} sendStudyPatientMessages={sendStudyPatientMessages} />
              </Modal.Body>
            </Modal>
            : ''
          }
        </div>
      </div>
    );

    /* return (
      <div>
        <h3>No matching patients found!</h3>
      </div>
    );*/
  }
}

const mapStateToProps = createStructuredSelector({
  patients: selectPatients(),
  selectedPatient: selectSelectedPatient(),
  selectedPatientDetailsForForm: selectSelectedPatientDetailsForForm(),
  savedPatient: selectSavedPatient(),
  chat: selectChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    addPatientsToTextBlast: (patients) => dispatch(addPatientsToTextBlast(patients)),
    change: (field, value) => dispatch(change(formName, field, value)),
    removePatientsFromTextBlast: (patients) => dispatch(removePatientsFromTextBlast(patients)),
    clearSelectedPatient: () => dispatch(clearSelectedPatient()),
    savePatient: (id, data) => dispatch(savePatient(id, data)),
    initChat: (payload) => dispatch(initChat(payload)),
    disableChat: (payload) => dispatch(disableChat(payload)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortPatientsSuccess: (patients) => dispatch(sortPatientsSuccess(patients)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
