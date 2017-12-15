/*
 *
 * GlobalNotifications
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { selectCurrentUser } from 'containers/App/selectors';
import { selectSocket } from 'containers/GlobalNotifications/selectors';
import {
  setSocketConnection,
  subscribeToPageEvent,
  unsubscribeFromPageEvent,
  unsubscribeFromAll,
  subscribeToChatEvent,
  receiveNotification,
} from 'containers/GlobalNotifications/actions';

export class GlobalNotifications extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setSocketConnection: PropTypes.func,
    subscribeToPageEvent: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    unsubscribeFromAll: PropTypes.func,
    subscribeToChatEvent: PropTypes.func,
    receiveNotification: PropTypes.func,
    socket: PropTypes.any,
    location: PropTypes.any,
    currentUser: PropTypes.any,
    events: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.subscribeToPageEvents = this.subscribeToPageEvents.bind(this);
    this.subscribeToChat = this.subscribeToChat.bind(this);
  }

  componentDidMount() {
    const props = this.props;

    if (!props.socket && props.currentUser) {
      props.setSocketConnection({
        nsp: 'nsp',
        props,
        cb: (err, socket) => {
          if (!err) {
            socket.on('notification', (notification) => {
              console.log(notification);
              this.props.receiveNotification(notification);
            });
            socket.on('connect', () => {
              this.subscribeToPageEvents();
            });
          } else {
            console.error(err);
          }
        },
      });
    }
  }

  componentWillReceiveProps() {}

  getEventTypes() {
    switch (this.props.location.pathname) {
      default:
        return [
          'twilio-message',
        ];
    }
  }

  get eventsList() {
    return this.EventsList;
  }

  set eventsList(value) {
    this.EventsList = value;
  }

  subscribeToPageEvents() {
    const events = [
      {
        events: [
          'twilio-message',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-patient',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-irb_ad_creation',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-user',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-site',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-study',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'study-end',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'create-proposal',
        ],
        raw: { pathname: this.props.location.pathname },
      },
      {
        events: [
          'update-patientCategory',
        ],
        raw: { pathname: this.props.location.pathname },
      },
    ];

    if (events) {
      events.forEach(event => {
        this.props.subscribeToPageEvent({
          events: event.events,
          raw: event.raw,
          cb: (err, data) => {
            if (!err) {
              const eventData = data;
              eventData.count = 0;
              const eventsList = this.eventsList || [];
              if (_.find(eventsList, eventData)) {
                eventData.count++;
              } else {
                eventsList.push(eventData);
              }
              this.eventsList = eventsList;
            } else {
              console.error(err);
            }
          },
        });
      });
    }
  }

  subscribeToChat() {
    this.props.subscribeToChatEvent({
      events: ['subscribe-chat'],
      raw: {
        studyId: 1,
        patientId: 1,
        firstName: 'test',
        lastName: 'test',
        phone: '111111111',
      },
      cb: (err, data) => {
        console.log(err, data);
      },
    });
  }

  render() {
    /* const layout = (<div>
      <div onClick={this.subscribeToPageEvents}>subscribe to twilio-message</div>
      <div onClick={this.subscribeToChat}>subscribe to chat</div>
    </div>); */

    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  socket: selectSocket(),
});

const mapDispatchToProps = {
  setSocketConnection,
  subscribeToPageEvent,
  unsubscribeFromPageEvent,
  unsubscribeFromAll,
  subscribeToChatEvent,
  receiveNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotifications);
