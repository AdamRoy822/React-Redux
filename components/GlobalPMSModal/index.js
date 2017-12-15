/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import Sound from 'react-sound';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CenteredModal from '../../components/CenteredModal/index';
import Modal from 'react-bootstrap/lib/Modal';
import {
  selectCurrentUser,
  selectSitePatients,
  selectPatientMessages,
} from 'containers/App/selectors';

import MessageItem from './MessageItem';
import CallItem from './CallItem';
import PatientItem from './PatientItem';

import ChatForm from './ChatForm';

import {
  fetchSitePatients,
  searchSitePatients,
  fetchPatientMessages,
  markAsReadPatientMessages,
  updateSitePatients,
} from 'containers/App/actions';
import {
  selectSocket,
} from 'containers/GlobalNotifications/selectors';

import {
  sendStudyPatientMessages,
} from 'containers/GlobalNotifications/actions';

import _ from 'lodash';
import './styles.less';

import alertSound from './sounds/message_received.wav';

class GlobalPMSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: React.PropTypes.object,
    sitePatients: React.PropTypes.object,
    patientMessages: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    socket: React.PropTypes.any,
    fetchSitePatients: React.PropTypes.func,
    searchSitePatients: React.PropTypes.func,
    updateSitePatients: React.PropTypes.func,
    fetchPatientMessages: React.PropTypes.func,
    sendStudyPatientMessages: React.PropTypes.func,
    markAsReadPatientMessages: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onSoundFinished = this.onSoundFinished.bind(this);
    this.startSound = this.startSound.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      selectedPatient: { id: 0 },
      patientLoaded: true,
      socketBinded: false,
      playSound: Sound.status.STOPPED,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.socket && this.state.socketBinded === false) {
      this.props.socket.on('notifyMessage', (newMessage) => {
        this.startSound();
        if (newMessage.twilioTextMessage.direction === 'inbound') {
          this.props.updateSitePatients(newMessage);
        }
        if (this.state.selectedPatient && this.state.selectedPatient.study_id) {
          this.props.fetchPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
          this.props.markAsReadPatientMessages(this.state.selectedPatient.id, this.state.selectedPatient.study_id);
        }
      });
      this.setState({ socketBinded: true });
    }
    if (newProps.showModal === true && newProps.sitePatients.details.length > 0 && this.state.patientLoaded === true) {
      let selectedPatient = { id: 0 };
      _.forEach(newProps.sitePatients.details, (item) => {
        if (item.show === undefined || (item.show && item.show === true)) {
          selectedPatient = item;
          return false;
        }
        return true;
      });
      this.selectPatient(selectedPatient);
      this.setState({ patientLoaded: false });
    }
  }

  componentDidUpdate() {
    const scrollable = this.scrollable;
    if (this.props.patientMessages && scrollable) {
      setTimeout(() => {
        scrollable.scrollTop = scrollable.scrollHeight;
      }, 0);
    }
  }

  onSoundFinished() {
    this.setState({ playSound: Sound.status.STOPPED });
  }

  startSound() {
    this.setState({ playSound: Sound.status.PLAYING });
  }

  selectPatient(item) {
    if (item.id !== this.state.selectedPatient.id) {
      this.setState({ selectedPatient: item });
      this.props.fetchPatientMessages(item.id, item.study_id);
      this.props.markAsReadPatientMessages(item.id, item.study_id);
    }
  }

  handleKeyPress(e) {
    const searchKey = this.searchKey;
    if (e.key === 'Enter') {
      this.props.searchSitePatients(searchKey.value);
      this.setState({ patientLoaded: true });
    }
  }

  render() {
    const { sitePatients, patientMessages, sendStudyPatientMessages } = this.props;
    const sitePatientArray = [];
    sitePatients.details.forEach((item) => {
      if (item.show === undefined || (item.show && item.show === true)) {
        sitePatientArray.push(item);
      }
    });
    const sitePatientsListContents = sitePatientArray.map((item, index) => (
      <PatientItem
        patientData={item}
        key={index}
        onSelectPatient={this.selectPatient}
        patientSelected={this.state.selectedPatient.id === item.id}
      />
    ));
    const patientMessageListContents = patientMessages.details.map((item, index) => {
      if (item.text_message_id) {
        return (<MessageItem
          messageData={item}
          key={index}
        />);
      }
      return (<CallItem
        messageData={item}
        key={index}
      />);
    });

    let protocolNumber = '';
    if (this.state.selectedPatient.protocol_number) {
      protocolNumber = 'Protocol: '.concat(this.state.selectedPatient.protocol_number);
    }
    return (
      <div>
        <Sound
          url={alertSound}
          playStatus={this.state.playSound}
          onFinishedPlaying={this.onSoundFinished}
        />
        <Modal className="custom-modal global-pms" dialogComponentClass={CenteredModal} id="chart-popup" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>PATIENT MESSAGING SUITE</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <aside className="aside-chat">
                <div className="scroll-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <input
                        className="form-control keyword-search"
                        type="search"
                        placeholder="Search"
                        onKeyPress={this.handleKeyPress}
                        ref={(searchKey) => {
                          this.searchKey = searchKey;
                        }}
                      />
                      <i className="icomoon-icon_search2"></i>
                    </div>
                  </div>
                  <ul className="tabset list-unstyled">
                    {sitePatientsListContents}
                  </ul>
                </div>
              </aside>
              <div className="chatroom">
                <section className="chat-area" id="chat-room1">
                  <header>
                    <strong className="name">{this.state.selectedPatient.first_name} {this.state.selectedPatient.last_name}</strong>
                    <a href="#">
                      <span className="protocol">{protocolNumber}</span>
                    </a>
                  </header>
                  <div
                    className="scroll-holder"
                    ref={(scrollable) => {
                      this.scrollable = scrollable;
                    }}
                  >
                    <article className="post-msg">
                      {patientMessageListContents}
                    </article>
                  </div>
                  <footer>
                    <ChatForm selectedPatient={this.state.selectedPatient} sendStudyPatientMessages={sendStudyPatientMessages} />
                  </footer>
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  sitePatients: selectSitePatients(),
  patientMessages: selectPatientMessages(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSitePatients: (siteId) => dispatch(fetchSitePatients(siteId)),
    searchSitePatients: (keyword) => dispatch(searchSitePatients(keyword)),
    updateSitePatients: (newMessage) => dispatch(updateSitePatients(newMessage)),
    fetchPatientMessages: (patientId, studyId) => dispatch(fetchPatientMessages(patientId, studyId)),
    markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPMSModal);
