/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import formValidator from './validator';
import CenteredModal from '../../../components/CenteredModal/index';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import * as Selector from '../selectors';
import { addPatientsToTextBlast, findPatientsForTextBlast, filterPatientsForTextBlast, removePatientFromTextBlast, removePatientsFromTextBlast, submitTextBlast } from '../actions';
import { selectActiveField, selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { actions as toastrActions } from 'react-redux-toastr';

const formName = 'StudyPage.TextBlastModal';

@reduxForm({
  form: formName,
  validate: formValidator,
})
class TextBlastModal extends React.Component {
  static propTypes = {
    activeField: React.PropTypes.any,
    addPatients: React.PropTypes.func.isRequired,
    bsClass: React.PropTypes.string,
    change: React.PropTypes.func.isRequired,
    className: React.PropTypes.any,
    dialogClassName: React.PropTypes.string,
    displayToastrError: React.PropTypes.func.isRequired,
    findPatients: React.PropTypes.func.isRequired,
    filterPatients: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
    removePatient: React.PropTypes.func.isRequired,
    removePatients: React.PropTypes.func.isRequired,
    role: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    sources: React.PropTypes.array.isRequired,
    studyId: React.PropTypes.number,
    style: React.PropTypes.object,
    submitTextBlast: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.filterPatients = this.filterPatients.bind(this);
    this.submitTextBlast = this.submitTextBlast.bind(this);
    this.renderPatientSearchList = this.renderPatientSearchList.bind(this);
    this.renderPatients = this.renderPatients.bind(this);
    this.renderPatientCount = this.renderPatientCount.bind(this);
  }

  selectCategory(checked, categoryId) {
    const { change, findPatients, formValues, patientCategories, sources, studyId, removePatients } = this.props;
    // find patients for text blast
    let sourceIds = null;
    if (!formValues.source) {
      sourceIds = [];
      for (const source of sources) {
        if (formValues[`source-${source.id}`]) {
          sourceIds.push(source.id);
        }
      }
    }
    if (categoryId === 0) {
      for (const category of patientCategories) {
        change(`category-${category.id}`, checked);
      }
      if (checked || sourceIds.length) {
        findPatients(studyId, null, null, sourceIds);
      } else {
        removePatients();
      }
    } else {
      // change the all option to unchecked
      change('category', false);
      const categoryIds = [];
      if (checked) {
        categoryIds.push(categoryId);
      }
      for (const category of patientCategories) {
        if (categoryId !== category.id && formValues[`category-${category.id}`]) {
          categoryIds.push(category.id);
        }
      }
      if (categoryIds.length || sourceIds.length) {
        findPatients(studyId, null, categoryIds, sourceIds);
      } else {
        removePatients();
      }
    }
  }

  selectSource(checked, sourceId) {
    const { change, findPatients, formValues, patientCategories, sources, studyId, removePatients } = this.props;
    // find patients for text blast
    let categoryIds = null;
    if (!formValues.category) {
      categoryIds = [];
      for (const category of patientCategories) {
        if (formValues[`category-${category.id}`]) {
          categoryIds.push(category.id);
        }
      }
    }
    if (sourceId === 0) {
      for (const source of sources) {
        change(`source-${source.id}`, checked);
      }
      if (checked || categoryIds.length) {
        findPatients(studyId, null, categoryIds, null);
      } else {
        removePatients();
      }
    } else {
      // change the all option to unchecked
      change('source', false);
      const sourceIds = [];
      if (checked) {
        sourceIds.push(sourceId);
      }
      for (const source of sources) {
        if (sourceId !== source.id && formValues[`source-${source.id}`]) {
          sourceIds.push(source.id);
        }
      }
      if (sourceIds.length || categoryIds.length) {
        findPatients(studyId, null, categoryIds, sourceIds);
      } else {
        removePatients();
      }
    }
  }

  filterPatients(event) {
    const { formValues, filterPatients } = this.props;
    if (formValues.patientSearchValues) {
      filterPatients(event.target.value, formValues.patients);
    }
  }

  submitTextBlast(event) {
    event.preventDefault();
    const { displayToastrError, formSyncErrors, formValues, submitTextBlast, onClose } = this.props;
    if (!formSyncErrors.message && !formSyncErrors.patients) {
      submitTextBlast(formValues.patients, formValues.message, onClose);
    } else if (formSyncErrors.message) {
      displayToastrError(formSyncErrors.message);
    } else if (formSyncErrors.patients) {
      displayToastrError(formSyncErrors.patients);
    }
  }

  renderPatientSearchList() {
    const { activeField, addPatients, formValues } = this.props;
    if (formValues.filteredPatientSearchValues) {
      return (
        <ul className={classNames('list list-unstyled', { active: activeField === 'search' })}>
          {formValues.filteredPatientSearchValues.map(patient => (
            <li
              key={patient.id}
              onClick={() => {
                addPatients([patient]);
              }}
            >
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

  renderPatients() {
    const { formValues, removePatient } = this.props;
    if (formValues.patients) {
      return (
        <div className="selected-patients-list">
          {formValues.patients.map(patient => (
            <div className="patient" key={patient.id}>
              <span className="name">{patient.firstName} {patient.lastName}</span>
              <a
                className="btn-remove"
                onClick={() => {
                  removePatient(patient);
                }}
              >
                <i className="icomoon-icon_trash" />
              </a>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  renderPatientCount() {
    const { formValues, removePatients } = this.props;
    if (formValues.patients && formValues.patients.length > 0) {
      return (
        <span className="emails-counter">
          <span className="counter">{formValues.patients.length}</span>
          <span className="text"> Patients</span>
          <a className="btn-close">
            <i className="icomoon-icon_close" onClick={removePatients} />
          </a>
        </span>
      );
    }
    return null;
  }

  render() {
    const { patientCategories, sources, show, role, bsClass, dialogClassName, className, style, onHide } = this.props;
    return (
      <Modal
        show={show}
        role={role}
        bsClass={bsClass}
        dialogClassName={dialogClassName}
        className={className}
        style={style}
        id="text-blast"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <div className="sidebar pull-left">
            <Modal.Title>
              <strong>Select Contacts</strong>
            </Modal.Title>
          </div>
          <Modal.Title>
            <strong className="title">Text Blast</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-email-blast-form">
            <div className="sidebar pull-left">
              <div className="scroll-holder jcf--scrollable">
                <div className="sub-holder">
                  <div className="custom-select-drop">
                    <div className="search-holder">
                      <Field
                        name="search"
                        type="search"
                        component={Input}
                        onChange={this.filterPatients}
                        className="keyword-search"
                      />
                      <i className="icomoon-icon_search2" />
                      {this.renderPatientSearchList()}
                    </div>
                  </div>
                  <div className="category">
                    <strong className="heading">Category</strong>
                    <ul className="check-list list-unstyled">
                      <li>
                        <Field
                          name="category"
                          type="checkbox"
                          component={Checkbox}
                          className="pull-left"
                          onChange={(checked) => {
                            this.selectCategory(checked, 0);
                          }}
                        />
                        All
                      </li>
                      {patientCategories.map(patientCategory => (
                        <li key={patientCategory.id}>
                          <Field
                            name={`category-${patientCategory.id}`}
                            type="checkbox"
                            component={Checkbox}
                            className="pull-left"
                            onChange={(checked) => {
                              this.selectCategory(checked, patientCategory.id);
                            }}
                          />
                          {patientCategory.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="category">
                    <strong className="heading">SOURCE</strong>
                    <ul className="check-list list-unstyled">
                      <li>
                        <Field
                          name="source"
                          type="checkbox"
                          component={Checkbox}
                          className="pull-left"
                          onChange={(checked) => {
                            this.selectSource(checked, 0);
                          }}
                        />
                        All
                      </li>
                      {sources.map(source => (
                        <li key={source.id}>
                          <Field
                            name={`source-${source.id}`}
                            type="checkbox"
                            component={Checkbox}
                            className="pull-left"
                            onChange={(checked) => {
                              this.selectSource(checked, source.id);
                            }}
                          />
                          {source.type}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {this.renderPatients()}
                </div>
              </div>
            </div>
            <div className="form-holder">
              <div className="scroll-holder jcf--scrollable">
                <div className="sub-holder">
                  <div className="subject-field">
                    <FormControl type="text" className="recievers" placeholder="To" disabled />
                    {this.renderPatientCount()}
                  </div>
                  <Field name="message" component={Input} componentClass="textarea" placeholder="Type a message..." required />
                  <div className="footer">
                    <Button type="submit" className="pull-right" onClick={this.submitTextBlast}>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
            <input type="reset" className="hidden btn btn-gray-outline" value="reset" />
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activeField: selectActiveField(formName),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
  patientCategories: Selector.selectPatientCategories(),
  sources: Selector.selectSources(),
  studyId: Selector.selectStudyId(),
});

function mapDispatchToProps(dispatch) {
  return {
    addPatients: (patients) => dispatch(addPatientsToTextBlast(patients)),
    change: (field, value) => dispatch(change(formName, field, value)),
    displayToastrError: (error) => dispatch(toastrActions.error(error)),
    findPatients: (studyId, text, categoryIds, sourceIds) => dispatch(findPatientsForTextBlast(studyId, text, categoryIds, sourceIds)),
    filterPatients: (text) => dispatch(filterPatientsForTextBlast(text)),
    removePatient: (patient) => dispatch(removePatientFromTextBlast(patient)),
    removePatients: () => dispatch(removePatientsFromTextBlast()),
    submitTextBlast: (patients, message, onClose) => dispatch(submitTextBlast(patients, message, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBlastModal);
