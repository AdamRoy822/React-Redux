/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';

class PatientNote extends React.Component {
  static propTypes = {
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
    submitDeleteNote: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderProfileImage = this.renderProfileImage.bind(this);
  }

  renderProfileImage() {
    const { note } = this.props;
    /* eslint-disable global-require */
    if (note.user.profileImageURL) {
      return (
        <img role="presentation" src={note.user.profileImageURL} />
      );
    }
    const url = require('../../../assets/images/Default-User-Img-Dr.png');
    return (
      <img role="presentation" src={url} />
    );
  }

  render() {
    const { currentPatient, currentUser, note, submitDeleteNote } = this.props;
    return (
      <div className={classNames('post-msg', { reply: note.user.id === currentUser.id })}>
        <div className="img-holder">
          {this.renderProfileImage()}
        </div>
        <div className="post-content">
          <p>{note.note}</p>
          <a
            className="btn-trash"
            onClick={() => {
              submitDeleteNote(currentPatient.id, note.id);
            }}
          >
            <i className="icomoon-icon_trash" />
          </a>
        </div>
        <strong className="name">{note.user.firstName} {note.user.lastName}</strong>
        <time dateTime={note.createdAt}>{moment.tz(note.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
      </div>
    );
  }
}

export default PatientNote;
