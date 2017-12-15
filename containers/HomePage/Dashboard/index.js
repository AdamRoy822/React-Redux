import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser, selectSitePatients } from 'containers/App/selectors';

import { fetchPatientSignUps, fetchPatientMessages, fetchRewardsPoint } from '../actions';
import { selectPatientSignUps, selectPatientMessages, selectRewardsPoint } from '../selectors';

import './styles.less';
import { sumBy } from 'lodash';
import graph from 'assets/images/graph.svg';

export class Dashboard extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    patientSignUps: PropTypes.object,
    patientMessages: PropTypes.object,
    rewardsPoint: PropTypes.number,
    fetchPatientSignUps: PropTypes.func,
    fetchPatientMessages: PropTypes.func,
    fetchRewardsPoint: PropTypes.func,
    sitePatients: React.PropTypes.object,
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.fetchPatientSignUps(currentUser);
    this.props.fetchPatientMessages(currentUser);
    this.props.fetchRewardsPoint(currentUser);
  }

  handleRedeemClick = () => {
    console.log('redeem clicked');
  }

  render() {
    const { patientSignUps, patientMessages, rewardsPoint, sitePatients } = this.props;
    const unreadTexts = sumBy(sitePatients.details, (sitePatient) => {
      if (sitePatient.count_unread == null) {
        return 0;
      }
      return parseInt(sitePatient.count_unread);
    });
    return (
      <section className="row infoarea text-uppercase">
        <h2 className="hidden">Statics</h2>
        <article className="col-xs-4 signup-info">
          <div className="box">
            <div className="img-holder pull-left"><img src={graph} width="141" height="119" alt=" " /></div>
            <div className="textbox">
              <h2>PATIENT <br /> SIGN UPS</h2>
              <span className="counter">TOTAL {patientSignUps.today + patientSignUps.yesterday}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">Yesterday</span>
              <strong className="number">{patientSignUps.yesterday} <span className="caret-holder"><i className="caret"></i></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Today</span>
              <strong className="number">{patientSignUps.today} <span className="caret-holder"><i className="caret"></i><i className="caret"></i></span></strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 msg-info">
          <div className="box">
            <div className="messages-counter pull-left">
              <i className="icomoon-icon_comment_alt"></i>
              <strong className="number hidden">72</strong>
            </div>
            <div className="textbox">
              <h2>PATIENT<br /> MESSAGES</h2>
              <span className="counter">TOTAL {unreadTexts + patientMessages.unreadEmails}</span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">UNREAD<br /> EMAILS</span>
              <strong className="number"><i className="icomoon-envelop"></i> {patientMessages.unreadEmails}</strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">UNREAD<br /> TEXTS</span>
              <strong className="number"><i className="icomoon-icon_chat_alt"></i> {unreadTexts}</strong>
            </div>
          </div>
        </article>
        <article className="col-xs-4 rewards-info">
          <div className="box">
            <i className="icomoon-gift pull-left"></i>
            <div className="textbox">
              <h2>REWARDS</h2>
              <a href="#popup-rewards" className="btn btn-info lightbox-opener" data-text="Redeem" data-hovertext="Redeem Now" onClick={() => this.handleRedeemClick()}>Redeem</a>
              <span className="counter">{rewardsPoint} KIK<span className="small text-lowercase">s</span></span>
            </div>
          </div>
          <div className="box">
            <div className="col pull-left">
              <span className="sub-title">REFER CRO/<br />SPONSORS</span>
              <strong className="number">+300 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
            <div className="col pull-right">
              <span className="sub-title">Refer <br /> Site</span>
              <strong className="number">+100 <span className="number-label">KIK<span className="text-lowercase">s</span></span></strong>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patientSignUps: selectPatientSignUps(),
  patientMessages: selectPatientMessages(),
  rewardsPoint: selectRewardsPoint(),
  sitePatients: selectSitePatients(),
});
const mapDispatchToProps = {
  fetchPatientSignUps,
  fetchPatientMessages,
  fetchRewardsPoint,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
