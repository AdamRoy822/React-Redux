/**
*
* ChatFrom
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset } from 'redux-form';
import Input from 'components/Input';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

import {
  selectChat,
} from 'containers/PatientDatabasePage/selectors';
import {
  selectSocket,
  selectProcessingStatus,
} from 'containers/GlobalNotifications/selectors';
import {
  fetchStudyPatientMessages,
  setProcessingStatus,
} from 'containers/GlobalNotifications/actions';

import './styles.less';

const formName = 'chatPatient';

@reduxForm({ form: formName, validate: formValidator })

class ChatForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isSaving: PropTypes.any,
    fetchStudyPatientMessages: PropTypes.func,
    setProcessingStatus: PropTypes.func,
    handleSubmit: PropTypes.func,
    socket: PropTypes.any,
    chat: PropTypes.object,
    sendStudyPatientMessages: PropTypes.func,
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      twilioMessages : [],
    };
    this.fetchStudyPatientMessages = this.fetchStudyPatientMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.fetchStudyPatientMessages(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.props.socket.on('notifyMessage', () => {
      this.fetchStudyPatientMessages(newProps);
    });
  }

  sendMessage(message) {
    const { chat, sendStudyPatientMessages, reset } = this.props;
    const options = {
      body: message.body,
      studyId: chat.details.study_id,
      patientId: chat.details.id,
      to: chat.details.phone,
    };

    sendStudyPatientMessages(options, (err, data) => {
      if (!err) {
        console.log('data', data);
      }
    });
    reset();
  }

  fetchStudyPatientMessages(props) {
    const scrollable = this.scrollable;
    const inputContainer = this.inputContainer;
    this.props.fetchStudyPatientMessages({
      studyId: props.chat.details.study_id,
      patientId:  props.chat.details.id,
      cb: (err, data) => {
        if (!err) {
          if (this.state.twilioMessages !== data.messages) {
            this.setState({ twilioMessages: data.messages }, () => {
              scrollable.scrollTop = scrollable.scrollHeight;
              inputContainer.childNodes[0].childNodes[0].value = '';
            });
          }
        } else {
          // console.log(err);
        }
        this.props.setProcessingStatus({ status: false });
      },
    });
  }

  render() {
    const { isSaving, handleSubmit } = this.props;
    const listMessages =
      (this.state.twilioMessages.length) ? this.state.twilioMessages.map((item) => (
        <span
          key={item.twilioTextMessage.sid}
          className={`message ${item.twilioTextMessage.direction}`}
        >
          {item.twilioTextMessage.body}
        </span>
      )) : 'in this chat, are no posts';

    return (
      <Form
        className="chat-form"
        onSubmit={handleSubmit(this.sendMessage)}
      >
        <fieldset>
          <div className="col-md-12">
            <div
              className="form-group messages"
              id="mess-container"
              ref={(scrollable) => {
                this.scrollable = scrollable;
              }}
            >
              {listMessages}
            </div>
            <div className="row form-group">
              <div
                className="field col-sm-12"
                ref={(inputContainer) => {
                  this.inputContainer = inputContainer;
                }}
              >
                <Field
                  name="body"
                  component={Input}
                  type="text"
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className="form-group pull-right">
              <Button type="submit" className="btn-add-row" disabled={isSaving}>
                {isSaving
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-patient" /></span>
                  : <span>Submit</span>
                }
              </Button>
            </div>
          </div>
        </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  chat: selectChat(),
  socket: selectSocket(),
  isSaving: selectProcessingStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudyPatientMessages: (payload) => dispatch(fetchStudyPatientMessages(payload)),
    setProcessingStatus: (payload) => dispatch(setProcessingStatus(payload)),
    reset: () => dispatch(reset(formName)),
  };
}

// export default ChatForm;

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
