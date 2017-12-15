/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { DragSource } from 'react-dnd';
import { formatPhone } from '../helper/functions';
import DragTypes from './dragSourceTypes';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const patientSource = {
  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.patient.id;
  },
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = {
      id: props.patient.id,
      patientCategoryId: props.category.id,
    };
    return item;
  },
};

const collect = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
});

@DragSource(DragTypes.PATIENT, patientSource, collect)
class Patient extends React.Component {

  static propTypes = {
    category: React.PropTypes.object.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    isDragging: React.PropTypes.bool.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
    onPatientTextClick: React.PropTypes.func.isRequired,
    patient: React.PropTypes.object.isRequired,
    unreadMessageCount: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderPatientTextMessageSummary = this.renderPatientTextMessageSummary.bind(this);
  }

  renderPatientTextMessageSummary(patient) {
    const { category, currentUser, onPatientTextClick, unreadMessageCount } = this.props;
    if (patient.lastTextMessage) {
      return (
        <a
          className="bottom"
          onClick={() => {
            onPatientTextClick(category, patient);
          }}
        >
          <div className="msg-alert">
            <div className="msg">
              <p>{patient.lastTextMessage.body}</p>
            </div>
            <div className="time">
              {(() => {
                if (unreadMessageCount > 0) {
                  return (
                    <span className="counter-circle">{unreadMessageCount}</span>
                  );
                }
                return false;
              })()}
              <time dateTime={patient.lastTextMessage.dateUpdated}>{moment.tz(patient.lastTextMessage.dateUpdated, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
            </div>
          </div>
        </a>
      );
    }
    return null;
  }

  render() {
    const { connectDragSource, category, currentPatientId, onPatientClick, patient } = this.props;
    const patientPhone = formatPhone(patient.phone);
    return connectDragSource(
      <li className={classNames({ 'patient-selected': patient.id === currentPatientId })}>
        <a
          className="top"
          onClick={() => {
            onPatientClick(category, patient);
          }}
        >
          <strong className="name">
            <span className="first-name">{patient.firstName}</span>
            <span> </span>
            <span className="last-name">{patient.lastName}</span>
          </strong>
          <span className="email">{patient.email}</span>
          <span className="phone">{patientPhone}</span>
        </a>
        {this.renderPatientTextMessageSummary(patient)}
      </li>
    );
  }
}

export default Patient;
