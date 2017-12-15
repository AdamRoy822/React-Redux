/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import enhanceWithClickOutside from 'react-click-outside';

import moment from 'moment';
import _ from 'lodash';

import {
  fetchNotifications,
  fetchUnreadNotificationsCount,
} from 'containers/GlobalNotifications/actions';

import {
  selectNotifications,
  selectUnreadNotificationsCount,
} from 'containers/GlobalNotifications/selectors';

import { getRedirectionUrl } from 'containers/NotificationsPage';

import avatar1 from 'assets/images/img2.png';
import avatar2 from 'assets/images/img3.png';
import avatar3 from 'assets/images/img4.png';

import './styles.less';

class NotificationBox extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    notifications: PropTypes.array,
    unreadNotificationsCount: PropTypes.number,
    fetchNotifications: PropTypes.func.isRequired,
    fetchUnreadNotificationsCount: PropTypes.func.isRequired,
  }

  state = {
    dropdownOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;

    this.props.fetchUnreadNotificationsCount(currentUser.id);
    this.props.fetchNotifications(currentUser.id);
  }

  getLocalTime(utc) {
    return moment.utc(utc).local();
  }

  handleBadgeNumberClick = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleClickOutside = () => {
    this.setState({ dropdownOpen: false });
  }

  render() {
    return (
      <div className="notifications pull-left open-close">
        <a
          href="#"
          className={classNames('opener', { active: this.state.dropdownOpen })}
          onClick={() => this.handleBadgeNumberClick()}
        >
          <i className="icomoon-bell" />
          <span className="counter">{this.props.unreadNotificationsCount}</span>
        </a>

        {this.state.dropdownOpen &&
          <div className="notifications-drop slide">
            <div className="well">
              <strong className="title">NOTIFICATIONS</strong>
              <div className="jcf-scrollable">
                <ul className="list-unstyled">
                  {/*
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar1} width="43" height="43" alt="Alan walker" /></div>
                      <p><strong>alan walker</strong> moved Thomas Morgan from New Patient to Consented.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:31 PM</time>
                    </a>
                  </li>
                  */}
                  {
                    _.take(this.props.notifications, 3).map(n => (
                      <li key={n.id}>
                        <a href={getRedirectionUrl(n)}>
                          <div className="img-circle"><img src={avatar1} width="43" height="43" alt="Alan walker" /></div>
                          <p dangerouslySetInnerHTML={{ __html: n.event_log.eventMessage }} />
                          <time>{`${this.getLocalTime(n.event_log.created).format('MM/DD/YY')} at ${this.getLocalTime(n.event_log.created).format('h:mm A')}`}</time>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="btn-block text-center">
                <Link className="hover-underline" to="/notifications">
                  See All
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications,
  unreadNotificationsCount: selectUnreadNotificationsCount,
});

const mapDispatchToProps = {
  fetchNotifications,
  fetchUnreadNotificationsCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(NotificationBox));
