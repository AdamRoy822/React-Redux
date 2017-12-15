/*
 *
 * ListNewStudyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import ShoppingCartForm from 'components/ShoppingCartForm';
import ListNewStudyForm from 'components/ListNewStudyForm';
import { selectListNewStudyPageDomain, selectFormSubmissionStatus, selectShowSubmitFormModal, selectIndicationLevelPrice } from 'containers/ListNewStudyPage/selectors';
import { selectListNewStudyFormValues, selectListNewStudyFormError } from 'components/ListNewStudyForm/selectors';
import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE } from 'common/constants';
import _, { find } from 'lodash';
import { submitForm, hideSubmitFormModal, fetchIndicationLevelPrice, clearFormSubmissionData } from 'containers/ListNewStudyPage/actions';
import { Modal } from 'react-bootstrap';
import LoadingSpinner from 'components/LoadingSpinner';
import './styles.less';

import Helmet from 'react-helmet';
import {
  fetchSites,
  fetchIndications,
  fetchLevels,
  saveSite,
  getAvailPhoneNumbers,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
  selectStudyLevels,
  selectSites,
  selectCurrentUser,
  selectAvailPhoneNumbers,
} from 'containers/App/selectors';

export class ListNewStudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    fullSiteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    listNewStudyState: PropTypes.object,
    formValues: PropTypes.object,
    submitForm: PropTypes.func,
    saveSite: PropTypes.func,
    hasErrors: PropTypes.bool,
    availPhoneNumbers: PropTypes.array,
    getAvailPhoneNumbers: PropTypes.func,
    currentUser: PropTypes.object,
    formSubmissionStatus: PropTypes.object,
    showSubmitFormModal: PropTypes.bool,
    hideSubmitFormModal: PropTypes.func,
    indicationLevelPrice: PropTypes.number,
    fetchIndicationLevelPrice: PropTypes.func,
    clearFormSubmissionData: PropTypes.func,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.submitForm = this.props.submitForm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.closeSubmitFormModal = this.closeSubmitFormModal.bind(this);
    this.goToStudyPage = this.goToStudyPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.fetchIndications();
    this.props.fetchLevels();
    this.props.getAvailPhoneNumbers();
  }

  componentWillReceiveProps(newProps) {
    // indication cahnge
    if (
      ((newProps.formValues.indication_id !== this.props.formValues.indication_id) ||
      (newProps.formValues.exposureLevel !== this.props.formValues.exposureLevel)) &&
      newProps.formValues.indication_id && newProps.formValues.exposureLevel &&
      newProps.formValues.indication_id !== undefined && newProps.formValues.exposureLevel !== undefined
    ) {
      this.props.fetchIndicationLevelPrice(newProps.formValues.indication_id, newProps.formValues.exposureLevel);
    }
  }

  onSubmitForm(params) {
    const filteredEmails = [];
    _.forEach(this.props.formValues.emailNotifications, (item) => {
      if (item.isChecked) {
        filteredEmails.push({ firstName: item.firstName, lastName: item.lastName, email: item.email });
      }
    });

    this.submitForm(params, { ...this.props.formValues, emailNotifications: filteredEmails, stripeCustomerId: this.props.currentUser.roleForClient.client.stripeCustomerId });
  }

  goToStudyPage() {
    // TODO: need to change url to patient-details when page will be ready
    this.props.clearFormSubmissionData();
    this.props.hideSubmitFormModal();
    this.props.history.push('patient-details');
  }

  closeSubmitFormModal() {
    this.props.clearFormSubmissionData();
    this.props.hideSubmitFormModal();
  }

  render() {
    const { siteLocations, indications, studyLevels, formValues, fullSiteLocations, hasErrors, indicationLevelPrice } = this.props;

    const addOns = [];
    const level = find(studyLevels, { id: formValues.exposureLevel });
    const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });

    if (level && months && indicationLevelPrice) {
      addOns.push({
        title: `${months.label} ${level.type}`,
        price: indicationLevelPrice,
        quantity: months.value,
        total: indicationLevelPrice * months.value,
      });
    }

    if (formValues.addPatientMessagingSuite) {
      addOns.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }

    if (formValues.callTracking) {
      addOns.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return (
      <StickyContainer className="container-fluid">
        <Helmet title="List New Study - StudyKIK" />
        <section className="study-portal">

          <h2 className="main-heading">LIST NEW STUDY</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              <ListNewStudyForm
                formValues={formValues}
                fullSiteLocations={fullSiteLocations}
                siteLocations={siteLocations}
                indications={indications}
                studyLevels={studyLevels}
                listNewStudyState={this.props.listNewStudyState}
                saveSite={this.props.saveSite}
                availPhoneNumbers={this.props.availPhoneNumbers}
              />
            </div>

            <div className="fixed-block">
              <div className="fixed-block-holder">
                <div className="order-summery-container">
                  <Sticky className="sticky-shopping-cart">
                    {<ShoppingCartForm showCards addOns={addOns} onSubmit={this.onSubmitForm} disableSubmit={hasErrors} />}
                  </Sticky>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal className="custom-modal" show={this.props.showSubmitFormModal}>
          <Modal.Header>
            <Modal.Title>Processing payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(() => {
              if (this.props.formSubmissionStatus.submitting) {
                return (
                  <div className="text-center"><span><LoadingSpinner showOnlyIcon size={20} /></span></div>
                );
              }
              if (this.props.formSubmissionStatus.response) {
                return (
                  <div className="text-center">
                    <div className="study-submit-form-modal-text alert alert-success" role="alert">Study has been listed successfully.</div>
                    <button onClick={this.goToStudyPage} type="button" className="study-submit-form-modal-button btn btn-success">Go To Study Page</button>
                  </div>
                );
              }
              if (this.props.formSubmissionStatus.error) {
                return (
                  <div className="text-center">
                    <div className="study-submit-form-modal-text alert alert-danger" role="alert">{`Error occurred while submitting your request. ${this.props.formSubmissionStatus.error.message}`}</div>
                    <button onClick={this.closeSubmitFormModal} type="button" className="study-submit-form-modal-button btn btn-danger">OK</button>
                  </div>
                );
              }
              return false;
            })()}
          </Modal.Body>
        </Modal>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  fullSiteLocations : selectSites(),
  indications   : selectIndications(),
  studyLevels   : selectStudyLevels(),
  listNewStudyState : selectListNewStudyPageDomain(),
  formValues: selectListNewStudyFormValues(),
  hasErrors: selectListNewStudyFormError(),
  availPhoneNumbers: selectAvailPhoneNumbers(),
  currentUser: selectCurrentUser(),
  formSubmissionStatus: selectFormSubmissionStatus(),
  showSubmitFormModal: selectShowSubmitFormModal(),
  indicationLevelPrice: selectIndicationLevelPrice(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchLevels:      () => dispatch(fetchLevels()),
    submitForm:     (cartValues, formValues) => dispatch(submitForm(cartValues, formValues)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
    hideSubmitFormModal:  () => dispatch(hideSubmitFormModal()),
    fetchIndicationLevelPrice: (indicationId, levelId) => dispatch(fetchIndicationLevelPrice(indicationId, levelId)),
    clearFormSubmissionData: () => (dispatch(clearFormSubmissionData())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewStudyPage);
