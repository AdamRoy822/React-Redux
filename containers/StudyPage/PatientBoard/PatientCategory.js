/**
 * Created by mike on 10/24/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser, selectSitePatients } from 'containers/App/selectors';
import * as Selector from '../selectors';
import DragTypes from './dragSourceTypes';
import Patient from './Patient';
import { submitMovePatientBetweenCategories } from '../actions';
import { find } from 'lodash';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const patientTarget = {
  drop(props, monitor) {
    if (monitor.didDrop()) {
      return;
    }
    // Obtain the dragged item
    const item = monitor.getItem();
    props.submitMovePatientBetweenCategories(props.studyId, item.patientCategoryId, props.category.id, item.id);
  },
};

const collect = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
});

@DropTarget(DragTypes.PATIENT, patientTarget, collect)
class PatientCategory extends React.Component {
  static propTypes = {
    studyId: React.PropTypes.number.isRequired,
    category: React.PropTypes.object.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    currentPatientId: React.PropTypes.number,
    currentUser: React.PropTypes.object.isRequired,
    submitMovePatientBetweenCategories: React.PropTypes.func.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
    onPatientTextClick: React.PropTypes.func.isRequired,
    sitePatients: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      columnWidth: '',
    };
    this.handleResize = this.handleResize.bind(this);
    this.renderPatients = this.renderPatients.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    if (this.state.columnWidth === '') {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const patientColumn = this.patientColumn;

    this.setState({ columnWidth: `${patientColumn.clientWidth}px` });
  }

  renderPatients() {
    const { category, currentPatientId, currentUser, onPatientClick, onPatientTextClick, studyId, sitePatients } = this.props;
    if (category.patients.length > 0) {
      return (
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => {
                const patientData = find(sitePatients.details, { study_id: studyId, id: patient.id });
                let unreadMessageCount = 0;
                if (patientData !== undefined) {
                  unreadMessageCount = patientData.count_unread === null ? 0 : parseInt(patientData.count_unread);
                }
                return (
                  <Patient
                    key={patient.id}
                    category={category}
                    currentPatientId={currentPatientId}
                    patient={patient}
                    unreadMessageCount={unreadMessageCount}
                    currentUser={currentUser}
                    onPatientClick={onPatientClick}
                    onPatientTextClick={onPatientTextClick}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { category, connectDropTarget } = this.props;

    const openerStyle = {
      width: this.state.columnWidth,
    };
    return connectDropTarget(
      <li
        key={category.id}
        ref={(patientColumn) => {
          this.patientColumn = patientColumn;
        }}
      >
        <span className="opener" style={openerStyle}>
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        {this.renderPatients()}
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatientId: Selector.selectCurrentPatientId(),
  currentUser: selectCurrentUser(),
  studyId: Selector.selectStudyId(),
  sitePatients: selectSitePatients(),
});

const mapDispatchToProps = (dispatch) => ({
  submitMovePatientBetweenCategories: (studyId, fromCategoryId, toCategoryId, patientId) => dispatch(submitMovePatientBetweenCategories(studyId, fromCategoryId, toCategoryId, patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientCategory);
