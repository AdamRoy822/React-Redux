import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser } from 'containers/App/selectors';

import defaultUserImage from 'assets/images/Default-User-Img.png';
import defaultUserImageGirl from 'assets/images/Default-User-Img-Girl.png';

class PatientItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    patientData: PropTypes.object,
    onSelectPatient: PropTypes.func,
    patientSelected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient() {
    this.props.onSelectPatient(this.props.patientData);
  }

  render() {
    const { patientData, patientSelected } = this.props;

    const lastDate = (new Date(patientData.twtm_max_date_created ? patientData.twtm_max_date_created : patientData.created_at)).toLocaleString();
    return (
      <li className={patientSelected === true ? 'active' : ''} onClick={this.selectPatient}>
        <a className="tab-opener">
          <div className="user-img">
            <img src={patientData.gender === 'Male' ? defaultUserImage : defaultUserImageGirl} alt="" />
          </div>
          <strong className="name">{patientData.first_name} {patientData.last_name}</strong>
          <p>{patientData.last_message_body ? patientData.last_message_body : 'No message yet'}</p>
          <time>
            {lastDate}
            {patientData.count_unread > 0
              ? <span className="counter-circle">{patientData.count_unread}</span>
              : ''
            }
          </time>
        </a>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientItem);
