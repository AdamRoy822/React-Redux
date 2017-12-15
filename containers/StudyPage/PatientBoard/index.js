/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { push } from 'react-router-redux';

import PatientCategory from './PatientCategory';
import PatientDetailModal from '../PatientDetail/PatientDetailModal';
import {
  fetchPatientDetails,
  setCurrentPatientCategoryId,
  setCurrentPatientId,
  setOpenPatientModal,
  switchToNoteSectionDetail,
  switchToTextSectionDetail,
  readStudyPatientMessages,
} from '../actions';
import { markAsReadPatientMessages } from 'containers/App/actions';

import Scroll from 'react-scroll';
const scroll = Scroll.animateScroll;

@DragDropContext(HTML5Backend)
class PatientBoard extends React.Component {
  static propTypes = {
    currentPatientId: React.PropTypes.number,
    currentPatientCategoryId: React.PropTypes.number,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    openPatientModal: React.PropTypes.bool.isRequired,
    patientCategories: React.PropTypes.array.isRequired,
    setCurrentPatientId: React.PropTypes.func.isRequired,
    setCurrentPatientCategoryId: React.PropTypes.func.isRequired,
    setOpenPatientModal: React.PropTypes.func.isRequired,
    switchToNoteSection: React.PropTypes.func.isRequired,
    switchToTextSection: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired,
    readStudyPatientMessages: React.PropTypes.func.isRequired,
    markAsReadPatientMessages: React.PropTypes.func,
    studyId: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      stick: false,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.onPatientTextClick = this.onPatientTextClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onPatientClick(category, patient) {
    const { currentPatientId, fetchPatientDetails, setCurrentPatientId, setCurrentPatientCategoryId, setOpenPatientModal, switchToNoteSection } = this.props;
    const show = (patient && currentPatientId !== patient.id) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(650, options);
      switchToNoteSection();
    } else {
      setCurrentPatientId(-1);
      setCurrentPatientCategoryId(-1);
    }
    // set up the redux state for opening the modal
    setOpenPatientModal(show);
  }

  onPatientTextClick(category, patient) {
    const {
      currentPatientId,
      fetchPatientDetails,
      setCurrentPatientId,
      setCurrentPatientCategoryId,
      setOpenPatientModal, switchToTextSection,
      studyId,
      readStudyPatientMessages,
      markAsReadPatientMessages,
    } = this.props;
    const show = (patient && currentPatientId !== patient.id) || false;
    if (show) {
      setCurrentPatientId(patient.id);
      setCurrentPatientCategoryId(category.id);
      fetchPatientDetails(patient.id);
      readStudyPatientMessages(patient.id, studyId);
      markAsReadPatientMessages(patient.id, studyId);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(650, options);
      switchToTextSection();
    } else {
      setCurrentPatientId(-1);
      setCurrentPatientCategoryId(-1);
    }
    // set up the redux state for opening the modal
    setOpenPatientModal(show);
  }

  handleScroll(event) {
    let scrollTop;
    if (event.target.scrollingElement) {
      scrollTop = event.target.scrollingElement.scrollTop;
    } else {
      // for firefox compatibility
      scrollTop = event.pageY;
    }
    this.setState({
      stick: scrollTop >= 654,
    });
  }

  showModal() {
    const { currentPatientId, fetchPatientDetails, openPatientModal } = this.props;
    // have a way to show the modal from the state, and also from an argument, so that we can handle both modal opening from page transitions and modal opening from a user action like a click
    if (openPatientModal) {
      fetchPatientDetails(currentPatientId);
      const options = {
        duration: 500,
      };
      scroll.scrollTo(633, options);
    }
  }

  render() {
    const { patientCategories, openPatientModal } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames('patients-list-area', { 'form-active': openPatientModal })}>
          <nav className="nav-status">
            <ul className={classNames('list-inline', { stick: this.state.stick })}>
              {patientCategories.map(patientCategory => (
                <PatientCategory key={patientCategory.id} category={patientCategory} onPatientClick={this.onPatientClick} onPatientTextClick={this.onPatientTextClick} />
              ))}
            </ul>
          </nav>
          <PatientDetailModal onClose={this.onPatientClick} />
        </div>
        <div className="patients-form-closer" onClick={this.onPatientClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatientId: Selector.selectCurrentPatientId(),
  currentPatientCategoryId: Selector.selectCurrentPatientCategoryId(),
  carousel: Selector.selectCarousel(),
  openPatientModal: Selector.selectOpenPatientModal(),
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = (dispatch) => (
  {
    fetchPatientDetails: (patientId) => dispatch(fetchPatientDetails(patientId)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
    setOpenPatientModal: (show) => dispatch(setOpenPatientModal(show)),
    switchToNoteSection: () => dispatch(switchToNoteSectionDetail()),
    switchToTextSection: () => dispatch(switchToTextSectionDetail()),
    push: (url) => dispatch(push(url)),
    readStudyPatientMessages: (patientId, studyId) => dispatch(readStudyPatientMessages(patientId, studyId)),
    markAsReadPatientMessages: (patientId, studyId) => dispatch(markAsReadPatientMessages(patientId, studyId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientBoard);
