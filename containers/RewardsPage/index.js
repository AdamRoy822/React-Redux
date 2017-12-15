/*
 *
 * RewardsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  fetchSites,
  fetchClientSites,
  fetchRewards,
} from 'containers/App/actions';

import {
  selectCurrentUserClientId,
  selectUserSiteLocations,
  selectRewards,
} from 'containers/App/selectors';

import { submitForm } from 'containers/RewardsPage/actions';
import RewardModal from 'components/RewardModal';
import RewardForm from 'components/RewardForm';
import RewardsList from './RewardsList';

import cardStudykik from 'assets/images/img6.png';
import cardAmazon from 'assets/images/img7.png';
import cardStarbucks from 'assets/images/img8.png';
import diamond from 'assets/images/diamond.svg';
import platinum from 'assets/images/platinum.svg';
import gold from 'assets/images/gold.svg';


export class RewardsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    currentUser: PropTypes.object,
    currentUserClientId: PropTypes.number,
    rewards: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchRewards: PropTypes.func,
    onSubmitForm: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      rewardModalOpen: false,
    };

    this.openRewardModal = this.openRewardModal.bind(this);
    this.closeRewardModal = this.closeRewardModal.bind(this);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }
  componentWillMount() {
    this.props.fetchSites();
    const { currentUserClientId } = this.props;
    if (currentUserClientId) {
      this.props.fetchClientSites(currentUserClientId, {});
    }
  }

  componentDidMount() {
    this.props.fetchRewards();
  }

  openRewardModal() {
    this.setState({ rewardModalOpen: true });
  }

  closeRewardModal() {
    this.setState({ rewardModalOpen: false });
  }

  render() {
    const { siteLocations } = this.props;
    return (
      <div className="container-fluid">

        <section className="rewards">
          <h2 className="main-heading">REWARDS</h2>
          <div className="form-search clearfix">
            <div className="pull-left custom-select">
              <RewardForm
                siteLocations={siteLocations}
              />
            </div>
          </div>

          <header className="sub-header clearfix">
            <h3 className="pull-left">Wayne Enterprise Has <strong>450 KIKs</strong></h3>
            <a className="btn bgn-chat lightbox-opener pull-right" data-text="Redeem" data-hovertext="Redeem Now" onClick={this.openRewardModal}></a>
            <RewardModal siteLocations={siteLocations} showModal={this.state.rewardModalOpen} closeModal={this.closeRewardModal} onSubmit={this.onSubmitForm} />
          </header>

          <div className="row images-area">
            <div className="col-xs-4 pull-left">
              <a href="#" className="lightbox-opener option3" data-for="radio-option3" onClick={this.openRewardModal}><img alt="" src={cardStudykik} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a href="#" className="lightbox-opener option1" data-for="radio-option1" onClick={this.openRewardModal}><img alt="" src={cardStarbucks} /></a>
            </div>
            <div className="col-xs-4 pull-left">
              <a href="#" className="lightbox-opener option2" data-for="radio-option2" onClick={this.openRewardModal}><img alt="" src={cardAmazon} /></a>
            </div>
          </div>

          <div className="earning-info clearfix">

            <aside className="aside pull-left">
              <h3>HOW TO <br /> EARN KIKs </h3>

              <ol className="list-unstyled list-earning">
                <li>
                  <span className="number"><span></span></span>
                  <h4>FILL OUT ENROLLMENT DATA!</h4>
                  <p>For every study that you update your patient notes and status on weekly, you earn points</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Listing<br /> Studies!</h4>
                  <p>Every time you list a study, you earn points back</p>
                </li>
                <li>
                  <span className="number"><span></span></span>
                  <h4>Referrals!</h4>
                  <p>We appreciate your referrals! Earn points for every site or sponsor that lists a Platinum Study with StudyKIK</p>
                </li>
              </ol>
            </aside>

            <div className="detail">
              <div className="infoarea row">
                <div className="col-sm-4">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>DIAMOND LISTING</h3>
                        <strong className="number">+30 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img diamond"><img src={diamond} alt="DIAMOND LISTING" width="115" height="102" /></div>
                </div>

                <div className="col-sm-4 msg-info">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+150 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>PLATINUM LISTING</h3>
                        <strong className="number">+15 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img platinum"><img src={platinum} alt="PLATINUM LISTING" width="108" height="115" /></div>
                </div>

                <div className="col-sm-4 rewards-info">
                  <div>
                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+50 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>

                    <div className="box">
                      <div className="box-holder">
                        <h3>GOLD LISTING</h3>
                        <strong className="number">+5 <span>KIK<span className="text-lowercase">s</span></span></strong>
                      </div>
                    </div>
                  </div>
                  <div className="package-img gold"><img src={gold} alt="GOLD LISTING" width="98" height="108" /></div>
                </div>

              </div>

              <div className="infoarea row">
                <div className="col-xs-6 sponsor">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SPONSOR</h3>
                      <strong className="number">+300 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 site">
                  <div className="box">
                    <div className="box-holder">
                      <h3>REFER A SITE</h3>
                      <strong className="number">+100 <span>KIK<span className="text-lowercase">s</span></span></strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <section className="table-holder">
            <RewardsList rewards={this.props.rewards} />
          </section>

        </section>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
  siteLocations: selectUserSiteLocations(),
  rewards: selectRewards(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites: () => dispatch(fetchSites()),
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchRewards: () => dispatch(fetchRewards()),
    onSubmitForm: (values) => dispatch(submitForm(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsPage);
